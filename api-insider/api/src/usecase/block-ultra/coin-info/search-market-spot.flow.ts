import BusinessSearchRule from '../../../core/business/block-ultra/rule/search.rule';
import { ICoinSpotService } from '../../../core/interfaces/coin-spot';

export class SearchMarketSpotFlow {
  constructor(private readonly service: ICoinSpotService) {}

  async execute(key: string, coinKey: string) {
    try {
      const query = await this.service.getQueryBuilder();
      query.where({ coinKey });
      if (key) { 
        const searchKey = key.toLowerCase();
        query.where('LOWER(exchangeName) LIKE :key', { key: `%${searchKey}%` }).limit(BusinessSearchRule.MAX_ITEM);
      } else {
        query.orderBy('"usdVolume"', 'DESC').take(20);
      }
      query.select(['"exchangeKey"', 'symbol', '"exchangeName"', '"exchangeIcon"']);
      const datas = await query.getRawMany();
      return datas;
    } catch (error) {
      console.log(error)
    }
  }
}

export default SearchMarketSpotFlow;
