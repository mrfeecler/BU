import { APIClient } from '../helpers/api_helper';

const apiClient = new APIClient();
const prefix = "api/";
export const FetchIeoIdo = (path, params) =>
  apiClient.get(`${prefix}${path}`, params);
export const FetchLaunchPadProjects = (params) =>
  apiClient.get(`${prefix}launch-pad-projects`, params);

export const FetchIeoIdoUpcoming = (params) =>
  apiClient.get('${prefix}ieo-ido', params);
export const FetchUnlockDetail = (params) =>
  apiClient.get(`${prefix}ieo-ido/${params}`);
export const IeoIdoSearch = (params) =>
  apiClient.get('${prefix}ieo-ido/search', params);
export const TopIdoLaunchPadSearch = (params) =>
  apiClient.get('${prefix}ieo-ido/top-ido-launch-pad/search', params);
export const TopIdoLaunchPadDetail = (params) =>
  apiClient.get(`${prefix}launch-pad-detail`, params);
