<script lang="ts" setup>
import type { NotificationItem } from '@vben/layouts';

import type { OpWorkNotification } from '#/generated/client';

import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationLoginExpiredModal } from '@vben/common-ui';
import { VBEN_GITHUB_URL } from '@vben/constants';
import { useWatermark } from '@vben/hooks';
import { SvgGithubIcon } from '@vben/icons';
import {
  BasicLayout,
  LockScreen,
  Notification,
  UserDropdown,
} from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import {
  notificationControllerFindMany,
  notificationControllerMarkAsArchived,
  notificationControllerMarkAsRead,
} from '#/generated/client';
import { client } from '#/generated/client/client.gen';
import { $t } from '#/locales';
import { useAppAuthStore } from '#/services/AuthService';
import { useAppOpWorkProfileStore } from '#/services/ProfileService';
import { useAuthStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';

import ProfileButton from './header/profile/profile-button.vue';

const notifications = ref<NotificationItem[]>([]);
const streamAbortController = ref<AbortController | null>(null);

const router = useRouter();
const userStore = useUserStore();
const appAuthStore = useAppAuthStore();
const authStore = useAuthStore();
const opWorkProfileStore = useAppOpWorkProfileStore();
const accessStore = useAccessStore();
const { destroyWatermark, updateWatermark } = useWatermark();
const showDot = computed(() =>
  notifications.value.some((item) => !item.isRead),
);

const menus = computed(() => [
  {
    handler: () => {
      router.push({ name: 'Profile' });
    },
    icon: 'lucide:user',
    text: $t('page.auth.profile'),
  },
  {
    handler: () => {
      openWindow(VBEN_GITHUB_URL, {
        target: '_blank',
      });
    },
    icon: SvgGithubIcon,
    text: 'GitHub',
  },
]);

const avatar = computed(() => {
  // 🔥 используем аватар из профиля OpWork, если есть, иначе из userStore
  return (
    opWorkProfileStore.profile?.avatarUrl ??
    userStore.userInfo?.avatar ??
    preferences.app.defaultAvatar
  );
});

const userEmail = computed(() => {
  // 🔥 используем email из авторизационного профиля (auth store)
  return appAuthStore.profile?.email ?? '';
});

const isAdmin = computed(() => {
  // 🔥 используем email из авторизационного профиля (auth store)
  return opWorkProfileStore.profile?.userType === 'ADMIN';
});

const userName = computed(() => {
  // 🔥 используем имя из userStore или email из auth профиля
  return userStore.userInfo?.realName || appAuthStore.profile?.email || '';
});

function formatNotificationDate(isoDate?: null | string) {
  if (!isoDate) {
    return '-';
  }
  return dayjs(isoDate).format('YYYY-MM-DD HH:mm');
}

function extractLinkData(data: unknown) {
  if (!data || typeof data !== 'object') {
    return { link: undefined, query: undefined, state: undefined };
  }

  const record = data as Record<string, unknown>;
  const link = typeof record.link === 'string' ? record.link : undefined;
  const query =
    record.query && typeof record.query === 'object'
      ? (record.query as Record<string, any>)
      : undefined;
  const state =
    record.state && typeof record.state === 'object'
      ? (record.state as Record<string, any>)
      : undefined;

  return { link, query, state };
}

function mapNotificationItem(item: OpWorkNotification): NotificationItem {
  const avatarUrl =
    opWorkProfileStore.profile?.avatarUrl ??
    userStore.userInfo?.avatar ??
    preferences.app.defaultAvatar;
  const { link, query, state } = extractLinkData(item.data);

  return {
    id: item.id,
    avatar: avatarUrl,
    date: formatNotificationDate(item.createdAt),
    isRead: !!item.isRead,
    message: item.message,
    title: item.title,
    link,
    query,
    state,
  };
}

function toErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return $t('common.operationFailed');
}

async function fetchNotifications() {
  const result = await notificationControllerFindMany({
    query: {
      isArchived: false,
      sort: 'createdAt:desc',
      perPage: 20,
    },
  });

  if (result.error) {
    throw result.error;
  }

  notifications.value = (result.data?.items || []).map((item) =>
    mapNotificationItem(item),
  );
}

function isOpWorkNotification(value: unknown): value is OpWorkNotification {
  return !!(
    value &&
    typeof value === 'object' &&
    'id' in value &&
    'title' in value &&
    'message' in value
  );
}

function upsertNotification(item: OpWorkNotification) {
  if (item.isArchived) {
    notifications.value = notifications.value.filter(
      (notification) => notification.id !== item.id,
    );
    return;
  }

  const nextItem = mapNotificationItem(item);
  const index = notifications.value.findIndex(
    (notification) => notification.id === item.id,
  );

  if (index === -1) {
    notifications.value.unshift(nextItem);
    return;
  }

  notifications.value[index] = nextItem;
}

async function startNotificationStream() {
  if (streamAbortController.value) {
    streamAbortController.value.abort();
  }

  const abortController = new AbortController();
  streamAbortController.value = abortController;

  try {
    const sseClient = await client.sse.get({
      security: [
        { name: 'x-api-key', type: 'apiKey' },
        { name: 'x-session-id', type: 'apiKey' },
      ],
      signal: abortController.signal,
      url: '/api/notification/stream',
    });

    for await (const event of sseClient.stream) {
      if (abortController.signal.aborted) {
        break;
      }

      const payload =
        isOpWorkNotification(event) && event
          ? event
          : isOpWorkNotification((event as { data?: unknown })?.data)
            ? ((event as { data: OpWorkNotification }).data ?? null)
            : null;

      if (!payload) {
        continue;
      }

      upsertNotification(payload);
    }
  } catch (error) {
    if (abortController.signal.aborted) {
      return;
    }
    console.error('Notification stream error:', error);
  }
}

async function refreshNotificationsForActiveProfile() {
  notifications.value = [];

  if (streamAbortController.value) {
    streamAbortController.value.abort();
    streamAbortController.value = null;
  }

  if (!opWorkProfileStore.profileId) {
    return;
  }

  await fetchNotifications();
  await startNotificationStream();
}

async function handleLogout() {
  if (streamAbortController.value) {
    streamAbortController.value.abort();
    streamAbortController.value = null;
  }
  await authStore.logout(false);
}

async function handleNoticeClear() {
  const ids = notifications.value
    .map((item) => `${item.id}`)
    .filter((id) => id.length > 0);

  if (ids.length === 0) {
    return;
  }

  try {
    const result = await notificationControllerMarkAsArchived({
      body: { ids },
    });
    if (result.error) {
      throw result.error;
    }
    notifications.value = [];
  } catch (error) {
    message.error(toErrorMessage(error));
  }
}

async function markRead(id: number | string) {
  try {
    const result = await notificationControllerMarkAsRead({
      body: { ids: [`${id}`] },
    });
    if (result.error) {
      throw result.error;
    }
    notifications.value = notifications.value.map((item) =>
      item.id === id ? { ...item, isRead: true } : item,
    );
  } catch (error) {
    message.error(toErrorMessage(error));
  }
}

async function remove(id: number | string) {
  try {
    const result = await notificationControllerMarkAsArchived({
      body: { ids: [`${id}`] },
    });
    if (result.error) {
      throw result.error;
    }
    notifications.value = notifications.value.filter((item) => item.id !== id);
  } catch (error) {
    message.error(toErrorMessage(error));
  }
}

async function handleMakeAll() {
  const ids = notifications.value
    .filter((item) => !item.isRead)
    .map((item) => `${item.id}`);

  if (ids.length === 0) {
    return;
  }

  try {
    const result = await notificationControllerMarkAsRead({
      body: { ids },
    });
    if (result.error) {
      throw result.error;
    }
    notifications.value = notifications.value.map((item) => ({
      ...item,
      isRead: true,
    }));
  } catch (error) {
    message.error(toErrorMessage(error));
  }
}

onMounted(async () => {
  try {
    await refreshNotificationsForActiveProfile();
  } catch (error) {
    message.error(toErrorMessage(error));
  }
});

onUnmounted(() => {
  if (streamAbortController.value) {
    streamAbortController.value.abort();
    streamAbortController.value = null;
  }
});
watch(
  () => opWorkProfileStore.profileId,
  async (profileId, previousProfileId) => {
    if (profileId === previousProfileId) {
      return;
    }

    try {
      await refreshNotificationsForActiveProfile();
    } catch (error) {
      message.error(toErrorMessage(error));
    }
  },
);
watch(
  () => ({
    enable: preferences.app.watermark,
    content: preferences.app.watermarkContent,
  }),
  async ({ enable, content }) => {
    if (enable) {
      await updateWatermark({
        content:
          content || `${userStore.userInfo?.username} - ${userName.value}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userName"
        :description="userEmail"
        :tag-text="isAdmin ? 'Admin' : ''"
        @logout="handleLogout"
      />
    </template>
    <template #role>
      <ProfileButton />
    </template>
    <template #notification>
      <Notification
        :key="opWorkProfileStore.profileId ?? 'no-profile'"
        :dot="showDot"
        :notifications="notifications"
        @clear="handleNoticeClear"
        @read="(item) => item.id && markRead(item.id)"
        @remove="(item) => item.id && remove(item.id)"
        @make-all="handleMakeAll"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
</template>
