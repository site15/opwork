import {
  AdminForthResource,
  AdminForthResourceColumn,
  AdminUser,
  IAdminForthAndOrFilter,
  IAdminForthDataSourceConnectorBase,
  IAdminForthSingleFilter,
  IAdminForthSort,
} from 'adminforth';

export class CustomAdminForthDataSource implements IAdminForthDataSourceConnectorBase {
  validateAndNormalizeInputFilters(
    filter:
      | IAdminForthSingleFilter
      | IAdminForthAndOrFilter
      | Array<IAdminForthSingleFilter | IAdminForthAndOrFilter>
      | undefined,
  ): IAdminForthAndOrFilter {
    console.log(filter);
    throw new Error('Method not implemented.');
  }
  getPrimaryKey(resource: AdminForthResource): string {
    console.log(resource);
    throw new Error('Method not implemented.');
  }
  getData({
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
    console.log(resource, limit, offset, sort, filters);
    throw new Error('Method not implemented.');
  }
  getRecordByPrimaryKey(
    resource: AdminForthResource,
    recordId: string,
  ): Promise<any> {
    console.log(resource, recordId);
    throw new Error('Method not implemented.');
  }
  createRecord({
    resource,
    record,
    adminUser,
  }: {
    resource: AdminForthResource;
    record: any;
    adminUser: AdminUser;
  }): Promise<{ ok: boolean; error?: string; createdRecord?: any }> {
    console.log(resource, record, adminUser);
    throw new Error('Method not implemented.');
  }
  updateRecord({
    resource,
    recordId,
    newValues,
  }: {
    resource: AdminForthResource;
    recordId: string;
    newValues: any;
  }): Promise<{ ok: boolean; error?: string }> {
    console.log(resource, recordId, newValues);
    throw new Error('Method not implemented.');
  }
  getMinMaxForColumns({
    resource,
    columns,
  }: {
    resource: AdminForthResource;
    columns: AdminForthResourceColumn[];
  }): Promise<{ [key: string]: { min: any; max: any } }> {
    console.log(resource, columns);
    throw new Error('Method not implemented.');
  }
  client: any;
  setupClient(url: string): Promise<void> {
    console.log(url);
    throw new Error('Method not implemented.');
  }
  getAllTables(): Promise<Array<string>> {
    console.log('getAllTables');
    throw new Error('Method not implemented.');
  }
  getAllColumnsInTable(tableName: string): Promise<
    Array<{
      name: string;
      type?: string;
      isPrimaryKey?: boolean;
      sampleValue?: any;
    }>
  > {
    console.log(tableName);
    throw new Error('Method not implemented.');
  }
  getRecordByPrimaryKeyWithOriginalTypes(
    resource: AdminForthResource,
    recordId: string,
  ): Promise<any> {
    console.log(resource, recordId);
    throw new Error('Method not implemented.');
  }
  discoverFields(
    resource: AdminForthResource,
  ): Promise<{ [key: string]: AdminForthResourceColumn }> {
    console.log(resource);
    throw new Error('Method not implemented.');
  }
  getFieldValue(field: AdminForthResourceColumn, value: any) {
    throw new Error('Method not implemented.');
  }
  setFieldValue(field: AdminForthResourceColumn, value: any) {
    console.log(field, value);
    throw new Error('Method not implemented.');
  }
  getDataWithOriginalTypes({
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
    console.log(resource, limit, offset, sort, filters);
    throw new Error('Method not implemented.');
  }
  getCount({
    resource,
    filters,
  }: {
    resource: AdminForthResource;
    filters: IAdminForthAndOrFilter;
  }): Promise<number> {
    console.log(resource, filters);
    throw new Error('Method not implemented.');
  }
  getMinMaxForColumnsWithOriginalTypes({
    resource,
    columns,
  }: {
    resource: AdminForthResource;
    columns: AdminForthResourceColumn[];
  }): Promise<{ [key: string]: { min: any; max: any } }> {
    console.log(resource, columns);
    throw new Error('Method not implemented.');
  }
  createRecordOriginalValues({
    resource,
    record,
  }: {
    resource: AdminForthResource;
    record: any;
  }): Promise<string> {
    console.log(resource, record);
    throw new Error('Method not implemented.');
  }
  updateRecordOriginalValues({
    resource,
    recordId,
    newValues,
  }: {
    resource: AdminForthResource;
    recordId: string;
    newValues: any;
  }): Promise<void> {
    console.log(resource, recordId, newValues);
    throw new Error('Method not implemented.');
  }
  deleteRecord({
    resource,
    recordId,
  }: {
    resource: AdminForthResource;
    recordId: any;
  }): Promise<boolean> {
    console.log(resource, recordId);
    throw new Error('Method not implemented.');
  }
}
