import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const prefix = "api/";

export const GlobalSearchCoins = (params) =>
  apiClient.get(prefix + 'global-search-coin', params);

export const FetchHeaderBar = (params) =>
  apiClient.get(prefix + 'header-bar-runing', params);
