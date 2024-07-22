import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();

const prefix = 'api/';

export const FetchList = (params) => {
  return apiClient.get(prefix + 'exchanges', params);
};

export const FetchInfomationCoin = (params) => {
  return apiClient.get(prefix + 'exchange', params);
};

export const FetchSpotList = (params) => {
  return apiClient.get(prefix + 'exchange/spots', params);
};

export const SearchCoinsInFilter = (params) => {
  return apiClient.get(prefix + 'exchanges/spots/search', params);
};

export const SpotDetailSearch = (params) => {
  return apiClient.get(prefix + 'exchange-detail/spots/search', params);
};
