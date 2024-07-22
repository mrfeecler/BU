import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();
const prefix = "api/";
export const FetchDetailCategoriesOverview = (url, params) =>
  apiClient.get(`${prefix}${url}`, params);
