import { ICoinService } from '../../../core/interfaces/coin';
import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule'; 

export class SearchCategoryCoinFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(key: string, categoryId: number) {
    const query = await this.service.getQueryBuilder();
    query.where({ categoryId });

    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` }).limit(BusinessSearch.MAX_ITEM);
    } else {
      query.orderBy('"marketCap"', 'DESC', "NULLS LAST").take(20);
    }
    query.select(BusinessSearch.SELECT_COIN_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchCategoryCoinFlow;
