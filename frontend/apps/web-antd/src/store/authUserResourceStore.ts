import type {
  AuthUserControllerFindManyData,
  AuthUserControllerUpdateOneData,
  FindManyAuthUserResponse,
} from '#/generated/client';

import { ref } from 'vue';

import { defineStore } from 'pinia';

import {
  authUserControllerDeleteOne,
  authUserControllerFindMany,
  authUserControllerUpdateOne,
} from '#/generated/client';

export const useAuthUserResourceStore = defineStore(
  'authUserResourceStore',
  () => {
    const response = ref<FindManyAuthUserResponse | null>(null);
    const loading = ref(false);
    const error = ref<unknown>(null);

    async function findMany(query: AuthUserControllerFindManyData['query']) {
      loading.value = true;
      error.value = null;
      try {
        const result = await authUserControllerFindMany({ query });
        if (result.error) {
          error.value = result.error;
          return;
        }
        response.value = result.data || null;
      } catch (error_) {
        error.value = error_;
      } finally {
        loading.value = false;
      }
    }

    async function updateOne(
      id: string,
      data: AuthUserControllerUpdateOneData['body'],
    ) {
      loading.value = true;
      error.value = null;
      try {
        const result = await authUserControllerUpdateOne({
          path: { id },
          body: data,
        });
        if (result.error) {
          error.value = result.error;
          return null;
        }
        // Refresh the list after successful update
        await findMany({});
        return result.data;
      } catch (error_) {
        error.value = error_;
        return null;
      } finally {
        loading.value = false;
      }
    }

    async function deleteOne(id: string) {
      loading.value = true;
      error.value = null;
      try {
        const result = await authUserControllerDeleteOne({
          path: { id },
        });
        if (result.error) {
          error.value = result.error;
          return false;
        }
        // Refresh the list after successful deletion
        await findMany({});
        return true;
      } catch (error_) {
        error.value = error_;
        return false;
      } finally {
        loading.value = false;
      }
    }

    return { response, loading, error, findMany, updateOne, deleteOne };
  },
);
