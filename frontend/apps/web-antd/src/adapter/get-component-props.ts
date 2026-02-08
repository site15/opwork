import { h, ref } from 'vue';

import { useDebounceFn } from '@vueuse/core';
import { notification } from 'ant-design-vue';

import { $t } from '#/locales';

export const getComponentProps = <T extends { id: string }>({
  findMany,
  getLabel,
}: {
  findMany: (
    searchText?: string,
  ) => Promise<{ data?: { items: T[] }; error?: unknown }>;
  getLabel: (item: T) => string;
}) => {
  // Reactive references for search functionality
  const keyword = ref('');
  const fetching = ref(false);

  // Debounced search function
  const debouncedSearch = useDebounceFn((value: string) => {
    keyword.value = value;
  }, 300);

  const fetchRemoteOptions = async (params: { keyword?: string } = {}) => {
    try {
      fetching.value = true;
      const result = await findMany(params.keyword);

      if (result?.error) {
        notification.error({
          message: $t('actions.common.findManyFailed'),
          description:
            result.error instanceof Error ? result.error.message : '',
          duration: 3000,
        });
        return [];
      }

      return (
        result.data?.items.map((item) => ({
          label: getLabel(item),
          value: item.id,
        })) || []
      );
    } catch (error) {
      notification.error({
        message: $t('actions.common.findManyFailed'),
        description: error instanceof Error ? error.message : '',
        duration: 3000,
      });
      return [];
    } finally {
      fetching.value = false;
    }
  };
  return {
    componentProps: () => {
      return {
        api: fetchRemoteOptions,
        filterOption: false,
        notFoundContent: fetching.value ? undefined : null,
        onSearch: debouncedSearch,
        params: {
          keyword: keyword.value || undefined,
        },
        showSearch: true,
        placeholder: $t('ui.placeholder.select'),
      };
    },
    renderComponentContent: () => ({
      notFoundContent: fetching.value
        ? h('div', { class: 'flex justify-center p-2' }, [
            h('div', {
              class:
                'animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full',
            }),
          ])
        : undefined,
    }),
  };
};
