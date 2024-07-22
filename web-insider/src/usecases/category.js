import { APIClient } from '../helpers/api_helper';
const prefix = "api/";
const apiClient = new APIClient();

export const FetchCategoryDetail = (params) =>
  apiClient.get(`${prefix}category`, params);

export const FetchCategoryCoins = (params) =>
  apiClient.get(`${prefix}category/coins`, params);

export const CategoryCoinsSearch = (params) =>
  apiClient.get(`${prefix}category/coins/search`, params);
