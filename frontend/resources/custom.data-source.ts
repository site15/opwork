import {
  AdminForthDataTypes,
  AdminForthFilterOperators,
  AdminForthResource,
  AdminForthResourceColumn,
  AdminUser,
  IAdminForthAndOrFilter,
  IAdminForthDataSourceConnectorBase,
  IAdminForthSingleFilter,
  IAdminForthSort,
} from 'adminforth';
import {
  authApiKeyControllerCreateOne,
  authApiKeyControllerDeleteOne,
  authApiKeyControllerFindMany,
  authApiKeyControllerFindOne,
  authApiKeyControllerUpdateOne,
  authSessionControllerCreateOne,
  authSessionControllerDeleteOne,
  authSessionControllerFindMany,
  authSessionControllerFindOne,
  authSessionControllerUpdateOne,
  authUserControllerCreateOne,
  authUserControllerDeleteOne,
  authUserControllerFindMany,
  authUserControllerFindOne,
  authUserControllerUpdateOne,
  opWorkApplicationControllerCreateOne,
  opWorkApplicationControllerDeleteOne,
  opWorkApplicationControllerFindMany,
  opWorkApplicationControllerFindOne,
  opWorkApplicationControllerUpdateOne,
  opWorkEducationControllerCreateOne,
  opWorkEducationControllerDeleteOne,
  opWorkEducationControllerFindMany,
  opWorkEducationControllerFindOne,
  opWorkEducationControllerUpdateOne,
  opWorkEmployerControllerCreateOne,
  opWorkEmployerControllerDeleteOne,
  opWorkEmployerControllerFindMany,
  opWorkEmployerControllerFindOne,
  opWorkEmployerControllerUpdateOne,
  opWorkExperienceControllerCreateOne,
  opWorkExperienceControllerDeleteOne,
  opWorkExperienceControllerFindMany,
  opWorkExperienceControllerFindOne,
  opWorkExperienceControllerUpdateOne,
  opWorkJobControllerCreateOne,
  opWorkJobControllerDeleteOne,
  opWorkJobControllerFindMany,
  opWorkJobControllerFindOne,
  opWorkJobControllerUpdateOne,
  opWorkJobSeekerControllerCreateOne,
  opWorkJobSeekerControllerDeleteOne,
  opWorkJobSeekerControllerFindMany,
  opWorkJobSeekerControllerFindOne,
  opWorkJobSeekerControllerUpdateOne,
  opWorkJobSeekerSkillControllerCreateOne,
  opWorkJobSeekerSkillControllerDeleteOne,
  opWorkJobSeekerSkillControllerFindMany,
  opWorkJobSeekerSkillControllerFindOne,
  opWorkJobSeekerSkillControllerUpdateOne,
  opWorkJobSkillControllerCreateOne,
  opWorkJobSkillControllerDeleteOne,
  opWorkJobSkillControllerFindMany,
  opWorkJobSkillControllerFindOne,
  opWorkJobSkillControllerUpdateOne,
  opWorkJobTagControllerCreateOne,
  opWorkJobTagControllerDeleteOne,
  opWorkJobTagControllerFindMany,
  opWorkJobTagControllerFindOne,
  opWorkJobTagControllerUpdateOne,
  opWorkJobViewControllerCreateOne,
  opWorkJobViewControllerDeleteOne,
  opWorkJobViewControllerFindMany,
  opWorkJobViewControllerFindOne,
  opWorkJobViewControllerUpdateOne,
  opWorkNotificationControllerCreateOne,
  opWorkNotificationControllerDeleteOne,
  opWorkNotificationControllerFindMany,
  opWorkNotificationControllerFindOne,
  opWorkNotificationControllerUpdateOne,
  opWorkNotificationSettingsControllerCreateOne,
  opWorkNotificationSettingsControllerDeleteOne,
  opWorkNotificationSettingsControllerFindMany,
  opWorkNotificationSettingsControllerFindOne,
  opWorkNotificationSettingsControllerUpdateOne,
  opWorkProfileControllerCreateOne,
  opWorkProfileControllerDeleteOne,
  opWorkProfileControllerFindMany,
  opWorkProfileControllerFindOne,
  opWorkProfileControllerUpdateOne,
  opWorkProjectControllerCreateOne,
  opWorkProjectControllerDeleteOne,
  opWorkProjectControllerFindMany,
  opWorkProjectControllerFindOne,
  opWorkProjectControllerUpdateOne,
  opWorkSavedJobControllerCreateOne,
  opWorkSavedJobControllerDeleteOne,
  opWorkSavedJobControllerFindMany,
  opWorkSavedJobControllerFindOne,
  opWorkSavedJobControllerUpdateOne,
  opWorkSavedSearchControllerCreateOne,
  opWorkSavedSearchControllerDeleteOne,
  opWorkSavedSearchControllerFindMany,
  opWorkSavedSearchControllerFindOne,
  opWorkSavedSearchControllerUpdateOne,
  opWorkSearchHistoryControllerCreateOne,
  opWorkSearchHistoryControllerDeleteOne,
  opWorkSearchHistoryControllerFindMany,
  opWorkSearchHistoryControllerFindOne,
  opWorkSearchHistoryControllerUpdateOne,
  opWorkSkillControllerCreateOne,
  opWorkSkillControllerDeleteOne,
  opWorkSkillControllerFindMany,
  opWorkSkillControllerFindOne,
  opWorkSkillControllerUpdateOne,
  opWorkSkillSynonymControllerCreateOne,
  opWorkSkillSynonymControllerDeleteOne,
  opWorkSkillSynonymControllerFindMany,
  opWorkSkillSynonymControllerFindOne,
  opWorkSkillSynonymControllerUpdateOne,
} from '../generated/client/index.js';

// Map resource names to controller functions
const CONTROLLER_MAP: Record<string, any> = {
  'auth-api-key': {
    findMany: authApiKeyControllerFindMany,
    findOne: authApiKeyControllerFindOne,
    createOne: authApiKeyControllerCreateOne,
    updateOne: authApiKeyControllerUpdateOne,
    deleteOne: authApiKeyControllerDeleteOne,
  },
  'auth-session': {
    findMany: authSessionControllerFindMany,
    findOne: authSessionControllerFindOne,
    createOne: authSessionControllerCreateOne,
    updateOne: authSessionControllerUpdateOne,
    deleteOne: authSessionControllerDeleteOne,
  },
  'auth-user': {
    findMany: authUserControllerFindMany,
    findOne: authUserControllerFindOne,
    createOne: authUserControllerCreateOne,
    updateOne: authUserControllerUpdateOne,
    deleteOne: authUserControllerDeleteOne,
  },
  'op-work-application': {
    findMany: opWorkApplicationControllerFindMany,
    findOne: opWorkApplicationControllerFindOne,
    createOne: opWorkApplicationControllerCreateOne,
    updateOne: opWorkApplicationControllerUpdateOne,
    deleteOne: opWorkApplicationControllerDeleteOne,
  },
  'op-work-education': {
    findMany: opWorkEducationControllerFindMany,
    findOne: opWorkEducationControllerFindOne,
    createOne: opWorkEducationControllerCreateOne,
    updateOne: opWorkEducationControllerUpdateOne,
    deleteOne: opWorkEducationControllerDeleteOne,
  },
  'op-work-employer': {
    findMany: opWorkEmployerControllerFindMany,
    findOne: opWorkEmployerControllerFindOne,
    createOne: opWorkEmployerControllerCreateOne,
    updateOne: opWorkEmployerControllerUpdateOne,
    deleteOne: opWorkEmployerControllerDeleteOne,
  },
  'op-work-experience': {
    findMany: opWorkExperienceControllerFindMany,
    findOne: opWorkExperienceControllerFindOne,
    createOne: opWorkExperienceControllerCreateOne,
    updateOne: opWorkExperienceControllerUpdateOne,
    deleteOne: opWorkExperienceControllerDeleteOne,
  },
  'op-work-job': {
    findMany: opWorkJobControllerFindMany,
    findOne: opWorkJobControllerFindOne,
    createOne: opWorkJobControllerCreateOne,
    updateOne: opWorkJobControllerUpdateOne,
    deleteOne: opWorkJobControllerDeleteOne,
  },
  'op-work-job-seeker': {
    findMany: opWorkJobSeekerControllerFindMany,
    findOne: opWorkJobSeekerControllerFindOne,
    createOne: opWorkJobSeekerControllerCreateOne,
    updateOne: opWorkJobSeekerControllerUpdateOne,
    deleteOne: opWorkJobSeekerControllerDeleteOne,
  },
  'op-work-job-seeker-skill': {
    findMany: opWorkJobSeekerSkillControllerFindMany,
    findOne: opWorkJobSeekerSkillControllerFindOne,
    createOne: opWorkJobSeekerSkillControllerCreateOne,
    updateOne: opWorkJobSeekerSkillControllerUpdateOne,
    deleteOne: opWorkJobSeekerSkillControllerDeleteOne,
  },
  'op-work-job-skill': {
    findMany: opWorkJobSkillControllerFindMany,
    findOne: opWorkJobSkillControllerFindOne,
    createOne: opWorkJobSkillControllerCreateOne,
    updateOne: opWorkJobSkillControllerUpdateOne,
    deleteOne: opWorkJobSkillControllerDeleteOne,
  },
  'op-work-job-tag': {
    findMany: opWorkJobTagControllerFindMany,
    findOne: opWorkJobTagControllerFindOne,
    createOne: opWorkJobTagControllerCreateOne,
    updateOne: opWorkJobTagControllerUpdateOne,
    deleteOne: opWorkJobTagControllerDeleteOne,
  },
  'op-work-job-view': {
    findMany: opWorkJobViewControllerFindMany,
    findOne: opWorkJobViewControllerFindOne,
    createOne: opWorkJobViewControllerCreateOne,
    updateOne: opWorkJobViewControllerUpdateOne,
    deleteOne: opWorkJobViewControllerDeleteOne,
  },
  'op-work-notification': {
    findMany: opWorkNotificationControllerFindMany,
    findOne: opWorkNotificationControllerFindOne,
    createOne: opWorkNotificationControllerCreateOne,
    updateOne: opWorkNotificationControllerUpdateOne,
    deleteOne: opWorkNotificationControllerDeleteOne,
  },
  'op-work-notification-settings': {
    findMany: opWorkNotificationSettingsControllerFindMany,
    findOne: opWorkNotificationSettingsControllerFindOne,
    createOne: opWorkNotificationSettingsControllerCreateOne,
    updateOne: opWorkNotificationSettingsControllerUpdateOne,
    deleteOne: opWorkNotificationSettingsControllerDeleteOne,
  },
  'op-work-profile': {
    findMany: opWorkProfileControllerFindMany,
    findOne: opWorkProfileControllerFindOne,
    createOne: opWorkProfileControllerCreateOne,
    updateOne: opWorkProfileControllerUpdateOne,
    deleteOne: opWorkProfileControllerDeleteOne,
  },
  'op-work-project': {
    findMany: opWorkProjectControllerFindMany,
    findOne: opWorkProjectControllerFindOne,
    createOne: opWorkProjectControllerCreateOne,
    updateOne: opWorkProjectControllerUpdateOne,
    deleteOne: opWorkProjectControllerDeleteOne,
  },
  'op-work-saved-job': {
    findMany: opWorkSavedJobControllerFindMany,
    findOne: opWorkSavedJobControllerFindOne,
    createOne: opWorkSavedJobControllerCreateOne,
    updateOne: opWorkSavedJobControllerUpdateOne,
    deleteOne: opWorkSavedJobControllerDeleteOne,
  },
  'op-work-saved-search': {
    findMany: opWorkSavedSearchControllerFindMany,
    findOne: opWorkSavedSearchControllerFindOne,
    createOne: opWorkSavedSearchControllerCreateOne,
    updateOne: opWorkSavedSearchControllerUpdateOne,
    deleteOne: opWorkSavedSearchControllerDeleteOne,
  },
  'op-work-search-history': {
    findMany: opWorkSearchHistoryControllerFindMany,
    findOne: opWorkSearchHistoryControllerFindOne,
    createOne: opWorkSearchHistoryControllerCreateOne,
    updateOne: opWorkSearchHistoryControllerUpdateOne,
    deleteOne: opWorkSearchHistoryControllerDeleteOne,
  },
  'op-work-skill': {
    findMany: opWorkSkillControllerFindMany,
    findOne: opWorkSkillControllerFindOne,
    createOne: opWorkSkillControllerCreateOne,
    updateOne: opWorkSkillControllerUpdateOne,
    deleteOne: opWorkSkillControllerDeleteOne,
  },
  'op-work-skill-synonym': {
    findMany: opWorkSkillSynonymControllerFindMany,
    findOne: opWorkSkillSynonymControllerFindOne,
    createOne: opWorkSkillSynonymControllerCreateOne,
    updateOne: opWorkSkillSynonymControllerUpdateOne,
    deleteOne: opWorkSkillSynonymControllerDeleteOne,
  },
};

export class CustomAdminForthDataSource implements IAdminForthDataSourceConnectorBase {
  client: any;

  // Helper function to convert AdminForth filters to query parameters
  private convertFilters(filters: IAdminForthAndOrFilter): Record<string, any> {
    const query: Record<string, any> = {};

    // Process subFilters based on the operator
    if (filters.operator === AdminForthFilterOperators.AND) {
      filters.subFilters.forEach((filter) => {
        if ('field' in filter) {
          // Handle single filter
          if (filter.field) {
            query[filter.field] = filter.value;
          }
        } else if ('operator' in filter && 'subFilters' in filter) {
          // Handle nested AND/OR filter recursively
          Object.assign(
            query,
            this.convertFilters(filter as IAdminForthAndOrFilter),
          );
        }
      });
    } else if (filters.operator === AdminForthFilterOperators.OR) {
      // For OR conditions, we'll use the first one as an example
      // In a real implementation, you might need to handle this differently
      const firstFilter = filters.subFilters[0];
      if (firstFilter) {
        if ('field' in firstFilter) {
          if (firstFilter.field) {
            query[firstFilter.field] = firstFilter.value;
          }
        } else if ('operator' in firstFilter && 'subFilters' in firstFilter) {
          Object.assign(
            query,
            this.convertFilters(firstFilter as IAdminForthAndOrFilter),
          );
        }
      }
    }

    return query;
  }

  // Helper function to convert AdminForth sort to query parameter
  private convertSort(sort: IAdminForthSort[]): string | undefined {
    if (sort.length === 0) return undefined;
    const sortItem = sort[0];
    return `${sortItem.field}:${sortItem.direction.toLowerCase()}`;
  }

  validateAndNormalizeInputFilters(
    filter:
      | IAdminForthSingleFilter
      | IAdminForthAndOrFilter
      | Array<IAdminForthSingleFilter | IAdminForthAndOrFilter>
      | undefined,
  ): IAdminForthAndOrFilter {
    if (!filter) {
      return { operator: AdminForthFilterOperators.AND, subFilters: [] };
    }

    if (Array.isArray(filter)) {
      return {
        operator: AdminForthFilterOperators.AND,
        subFilters: filter as IAdminForthSingleFilter[],
      };
    }

    if ('operator' in filter && 'subFilters' in filter) {
      return filter as IAdminForthAndOrFilter;
    }

    return {
      operator: AdminForthFilterOperators.AND,
      subFilters: [filter as IAdminForthSingleFilter],
    };
  }

  getPrimaryKey(resource: AdminForthResource): string {
    // Assuming all resources use 'id' as primary key
    return 'id';
  }

  async getData({
    resource,
    limit,
    offset,
    sort,
    filters,
  }: {
    resource: AdminForthResource;
    limit: number;
    offset: number;
    sort: IAdminForthSort[];
    filters: IAdminForthAndOrFilter;
    getTotals?: boolean;
  }): Promise<{ data: Array<any>; total: number }> {
    const controllers = CONTROLLER_MAP[resource.table];
    if (!controllers) {
      throw new Error(`No controller found for resource: ${resource.table}`);
    }

    const query: Record<string, any> = {
      curPage: Math.floor(offset / limit) + 1,
      perPage: limit,
      sort: this.convertSort(sort),
      ...this.convertFilters(filters),
    };

    const result = await controllers.findMany({ query });

    if (result?.error) {
      console.log({ query, error: result.error });
      if (!result.error.error && !result.error.message) {
        console.error(result.error);
      }
      throw new Error(
        result.error.error || result.error.message || 'Failed to fetch data',
      );
    }

    return {
      data: result.data?.items || [],
      total: result.data?.meta?.totalResults || 0,
    };
  }

  async getRecordByPrimaryKey(
    resource: AdminForthResource,
    recordId: string,
  ): Promise<any> {
    const controllers = CONTROLLER_MAP[resource.table];
    if (!controllers) {
      throw new Error(`No controller found for resource: ${resource.table}`);
    }

    const result = await controllers.findOne({
      path: { id: recordId },
    });

    if (result?.error) {
      if (!result.error.error && !result.error.message) {
        console.error(result.error);
      }
      throw new Error(
        result.error.error || result.error.message || 'Failed to fetch record',
      );
    }

    return result.data;
  }

  async createRecord({
    resource,
    record,
    adminUser,
  }: {
    resource: AdminForthResource;
    record: any;
    adminUser: AdminUser;
  }): Promise<{ ok: boolean; error?: string; createdRecord?: any }> {
    const controllers = CONTROLLER_MAP[resource.table];
    if (!controllers) {
      return {
        ok: false,
        error: `No controller found for resource: ${resource.table}`,
      };
    }

    try {
      const result = await controllers.createOne({ body: record });

      if (result?.error) {
        if (!result.error.error && !result.error.message) {
          console.error(result.error);
        }
        return { ok: false, error: result.error.error || result.error.message };
      }

      return { ok: true, createdRecord: result.data };
    } catch (error: any) {
      return { ok: false, error: error.message };
    }
  }

  async updateRecord({
    resource,
    recordId,
    newValues,
  }: {
    resource: AdminForthResource;
    recordId: string;
    newValues: any;
  }): Promise<{ ok: boolean; error?: string }> {
    const controllers = CONTROLLER_MAP[resource.table];
    if (!controllers) {
      return {
        ok: false,
        error: `No controller found for resource: ${resource.table}`,
      };
    }

    try {
      const result = await controllers.updateOne({
        path: { id: recordId },
        body: newValues,
      });

      if (result?.error) {
        if (!result.error.error && !result.error.message) {
          console.error(result.error);
        }
        return { ok: false, error: result.error.error || result.error.message };
      }

      return { ok: true };
    } catch (error: any) {
      return { ok: false, error: error.message };
    }
  }

  async deleteRecord({
    resource,
    recordId,
  }: {
    resource: AdminForthResource;
    recordId: any;
  }): Promise<boolean> {
    const controllers = CONTROLLER_MAP[resource.table];
    if (!controllers) {
      return false;
    }

    try {
      const result = await controllers.deleteOne({
        path: { id: String(recordId) },
      });

      return !result?.error;
    } catch (error) {
      return false;
    }
  }

  // Implement other required methods with basic functionality
  async getMinMaxForColumns({
    resource,
    columns,
  }: {
    resource: AdminForthResource;
    columns: AdminForthResourceColumn[];
  }): Promise<{ [key: string]: { min: any; max: any } }> {
    // Return empty object for now - can be implemented later
    return {};
  }

  async setupClient(url: string): Promise<void> {
    // Client setup is handled by the generated SDK
    this.client = {};
  }

  async getAllTables(): Promise<Array<string>> {
    return Object.keys(CONTROLLER_MAP);
  }

  async getAllColumnsInTable(tableName: string): Promise<
    Array<{
      name: string;
      type?: string;
      isPrimaryKey?: boolean;
      sampleValue?: any;
    }>
  > {
    // Return basic column info - can be enhanced later
    return [
      { name: 'id', type: 'string', isPrimaryKey: true },
      { name: 'createdAt', type: 'datetime' },
      { name: 'updatedAt', type: 'datetime' },
    ];
  }

  async getRecordByPrimaryKeyWithOriginalTypes(
    resource: AdminForthResource,
    recordId: string,
  ): Promise<any> {
    return this.getRecordByPrimaryKey(resource, recordId);
  }

  async discoverFields(
    resource: AdminForthResource,
  ): Promise<{ [key: string]: AdminForthResourceColumn }> {
    // Return basic field definitions - can be enhanced later
    return {
      id: {
        name: 'id',
        type: AdminForthDataTypes.STRING,
        primaryKey: true,
        // required: true,
      },
      createdAt: {
        name: 'createdAt',
        type: AdminForthDataTypes.DATETIME,
        // required: false,
      },
      updatedAt: {
        name: 'updatedAt',
        type: AdminForthDataTypes.DATETIME,
        // required: false,
      },
    };
  }

  getFieldValue(field: AdminForthResourceColumn, value: any) {
    // Handle datetime conversion
    if (field.type === 'datetime' && value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }

  setFieldValue(field: AdminForthResourceColumn, value: any) {
    // Handle datetime conversion
    if (field.type === 'datetime' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }

  async getDataWithOriginalTypes({
    resource,
    limit,
    offset,
    sort,
    filters,
  }: {
    resource: AdminForthResource;
    limit: number;
    offset: number;
    sort: IAdminForthSort[];
    filters: IAdminForthAndOrFilter;
  }): Promise<Array<any>> {
    const result = await this.getData({
      resource,
      limit,
      offset,
      sort,
      filters,
    });
    return result.data;
  }

  async getCount({
    resource,
    filters,
  }: {
    resource: AdminForthResource;
    filters: IAdminForthAndOrFilter;
  }): Promise<number> {
    const result = await this.getData({
      resource,
      limit: 1,
      offset: 0,
      sort: [],
      filters,
    });
    return result.total;
  }

  async getMinMaxForColumnsWithOriginalTypes({
    resource,
    columns,
  }: {
    resource: AdminForthResource;
    columns: AdminForthResourceColumn[];
  }): Promise<{ [key: string]: { min: any; max: any } }> {
    return this.getMinMaxForColumns({ resource, columns });
  }

  async createRecordOriginalValues({
    resource,
    record,
  }: {
    resource: AdminForthResource;
    record: any;
  }): Promise<string> {
    const result = await this.createRecord({
      resource,
      record,
      adminUser: {} as AdminUser,
    });
    if (!result.ok) {
      throw new Error(result.error || 'Failed to create record');
    }
    return result.createdRecord?.id;
  }

  async updateRecordOriginalValues({
    resource,
    recordId,
    newValues,
  }: {
    resource: AdminForthResource;
    recordId: string;
    newValues: any;
  }): Promise<void> {
    const result = await this.updateRecord({ resource, recordId, newValues });
    if (!result.ok) {
      throw new Error(result.error || 'Failed to update record');
    }
  }
}
