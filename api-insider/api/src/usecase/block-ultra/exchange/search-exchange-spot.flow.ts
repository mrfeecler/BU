import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { IExchangeSpot } from '../../../core/interfaces/exchange-spot';

export class SearchExchangeSpotFlow {
  constructor(private readonly service: IExchangeSpot) {}

  async execute(name: string) {
    const query = await this.service.getQueryBuilder();
    if (name) {
      const searchKey = name.toLowerCase();
      query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` }).limit(BusinessSearch.MAX_ITEM);
    } else {
      query.orderBy('volume24h', 'DESC', 'NULLS LAST').take(20);
    }
    query.select(BusinessSearch.SELECT_EXCHANGE_SPOT_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchExchangeSpotFlow;
