<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

import type {AuthUser} from '../prisma/browser';

import { h, onMounted, watch  } from 'vue';

import { Page } from '@vben/common-ui';

import { NButton, NDataTable, useDialog, useMessage } from 'naive-ui';
import { storeToRefs } from 'pinia';

import { useAuthUserResourceStore } from '#/store/authUserResourceStore';

import {  Prisma } from '../prisma/browser';

function createColumns({
  edit,
  remove
}: {
  edit: (row: AuthUser) => void,
  remove: (row: AuthUser) => void
}): DataTableColumns<AuthUser> {
  return [
    {
      title: 'ID',
      key: Prisma.AuthUserScalarFieldEnum.id
    },
    {
      title: 'anonymousId',
      key: Prisma.AuthUserScalarFieldEnum.anonymousId
    },
    {
      title: 'supabaseUserId',
      key: Prisma.AuthUserScalarFieldEnum.supabaseUserId
    },
    {
      title: 'supabaseUserData',
      key: Prisma.AuthUserScalarFieldEnum.supabaseUserData,
      render(rowData) {
        return rowData.supabaseUserData ? JSON.stringify(rowData.supabaseUserData) : 'null'
      },
    },
    {
      title: 'isActive',
      key: Prisma.AuthUserScalarFieldEnum.isActive,
      render(rowData) {
        return rowData.isActive ? 'YES' : 'NO'
      },
    },
    {
      title: 'createdAt',
      key: Prisma.AuthUserScalarFieldEnum.createdAt,
      render(rowData) {
        return rowData.createdAt ? rowData.createdAt.toLocaleString() : 'null'
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h('div', { style: { display: 'flex', gap: '8px' } }, [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => edit(row)
            },
            { default: () => 'Edit' }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              type: 'error',
              size: 'small',
              onClick: () => remove(row)
            },
            { default: () => 'Delete' }
          )
        ])
      }
    }
  ]
}

const message = useMessage()
const dialog = useDialog()
const columns = createColumns({
  async edit(row: AuthUser) {
    // For now, just show a message. In a real implementation, you'd open an edit modal
    message.info(`Edit user: ${row.anonymousId || row.id}`)
    // TODO: Implement edit functionality with a modal form
  },
  remove(row: AuthUser) {
    dialog.warning({
      title: 'Confirm Deletion',
      content: `Are you sure you want to delete record ${row.anonymousId || row.id}? This action cannot be undone.`,
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: async () => {
        const success = await authUserResourceStore.deleteOne(row.id)
        if (success) {
          message.success('Record deleted successfully')
        } else {
          message.error('Failed to delete record')
        }
      }
    })
  }
})

const authUserResourceStore = useAuthUserResourceStore()
// Convert store state to reactive refs (like signals)
const { response, loading, error } = storeToRefs(authUserResourceStore)

// Watch for errors and display them
watch(error, (newError) => {
  if (newError) {
    let errorMessage = 'An error occurred';

    // Handle different error types
    if (typeof newError === 'string') {
      errorMessage = newError;
    } else if (newError instanceof Error) {
      errorMessage = newError.message;
    } else if (typeof newError === 'object' && newError !== null) {
      // Handle API error responses
      if ('message' in newError) {
        errorMessage = String(newError.message);
      } else if ('detail' in newError) {
        errorMessage = String(newError.detail);
      } else if ('error' in newError) {
        errorMessage = String(newError.error);
      } else {
        errorMessage = JSON.stringify(newError);
      }
    }

    message.error(`Error: ${errorMessage}`);
    // Clear the error after displaying it
    error.value = null;
  }
})

onMounted(() => {
  authUserResourceStore.findMany({})
})
</script>

<template>
  <Page description="Authentication Users Management" title="Auth Users">
    <NDataTable :columns="columns" :data="response?.items || []" :loading="loading" />
  </Page>
</template>

<style scoped></style>