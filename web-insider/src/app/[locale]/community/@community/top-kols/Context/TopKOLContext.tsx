import { Key, createContext } from 'react';

export type TTopKOLFilter = {
  page: number;
  limit: number;
  search_key?: string;
  country?: string;
  sort_by?: Key;
  sort_order?: 'asc' | 'desc';
};
export type TTopKOLData = {
  _id: string;
  avatar: string;
  name: string;
  rank: number;
  rank_change: number;
  rank_change_type: 'up' | 'down';
  tier: number;
  country: string;
  followers: number;
  scores: number;
  score_change_type: 'up' | 'down';
  score_change: number;
  blue_badge: boolean;
};
export type TTopKOLContext = {
  data: TTopKOLData[];
  total: number;
  loading: boolean;
  filter: TTopKOLFilter;
  handleFilter: (filter?: Partial<TTopKOLFilter>) => void;
};
const TopKOLContext = createContext<TTopKOLContext>({
  data: [],
  total: 0,
  loading: false,
  filter: {
    page: 1,
    limit: 50,
  },
  handleFilter: () => {},
});

export default TopKOLContext;
