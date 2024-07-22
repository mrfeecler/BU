import { ReactNode } from 'react';

export interface IMarquee {
  _id: string;
  created_at: string;
  updated_at: string;
  allCurrencies: string;
  btcDominanceChangePercent: string;
  totalVolume24h: string;
  totalMarketCapChangePercent: string;
  totalVolume24hChangePercent: string;
  btcDominance: string;
  totalMarketCap: string;
  gas: IGas;
  fear_greed?: any;
  btc_mvrv: string;
  btc_realized_price: string;
  btc_long: string;
  btc_short: number;
}

export interface IGas {
  low: IGasItem;
  average: IGasItem;
  high: IGasItem;
}

export interface ILow {
  gasPriceGwei: number;
  txExecutionTime: number;
}

export interface IAverage {
  gasPriceGwei: number;
  txExecutionTime: number;
}

export interface IGasItem {
  mins: string;
  price: string;
  priority: string;
  unit: string;
}

export interface IMarqueeItem {
  id: number;
  coinName: string;
  coinPrice?: string | number;
  coinPercent?: string | number;
  percent?: string | number;
  ratio?: string | number;
  unit?: string;
  icon?: string | ReactNode;
  child?: any;
  isGas?: boolean;
  isFear?: boolean;
  valueClassification?: string;
}
