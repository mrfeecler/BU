import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();
const prefix = "api/";
const baseUrl = `${prefix}token-unlocks`;

export const FetchTokenUnlock = (params) => apiClient.get(baseUrl, params);

export const FetchSearchTokenUnlock = (params) =>
  apiClient.get(baseUrl + '/search', params);

export const FetchUnlockDetail = (params) =>
  apiClient.get(`${baseUrl}/${params}`);

export const FetchUnlockHeader = () => {
  return apiClient.get(`${prefix}token-unlock-head`);
};
