export interface IExchangeSpot {
  _id: string;
  country: string;
  currenciesCount: string;
  dataChart: DataChart;
  icon: string;
  key: string;
  key2: string;
  name: string;
  percentVolume: number;
  tier: string;
  volume24h: number;
  volumn24hPercent: number;
}
interface DataChart {
  openInterests: [];
  timestamps: [];
  volumes: number[];
}

export interface ISearchFilter {
  key: string;
  name: string;
  image: Image;
  symbol: string;
}

interface Image {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}
