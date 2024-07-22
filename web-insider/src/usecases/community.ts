import { TTopKOLData } from '@/app/[locale]/community/@community/top-kols/Context/TopKOLContext';
import { APIClient } from '@/helpers/api_helper';
import { Key } from 'react';

const Api = new APIClient();
const prefix = 'api';

type TGetKOLsParams = {
  search_key?: string;
  sort_by?: Key;
  sort_order?: string;
  limit: number;
  page: number;
};
export const GetKOLs = async (params: TGetKOLsParams) => {
  const url = `${prefix}/kols`;
  const res = (await Api.get(url, params)) as unknown as {
    data: TTopKOLData[];
    total: number;
  };
  return res;
};

export const GetKOLsFilterNames = async (
  params: Pick<TGetKOLsParams, 'search_key'>
) => {
  const url = `${prefix}/kols/search`;
  const res = (await Api.get(url, params)) as unknown as {
    data: string[];
  };
  return res;
};
