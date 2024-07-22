import BusinessSearch     from '../../../core/business/block-ultra/rule/search.rule';
import { ICoinService }   from '../../../core/interfaces/coin';

export class SearchCoinFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` }).limit(BusinessSearch.MAX_ITEM);
    } else {
      query.orderBy('rank', 'ASC').limit(20);
    }
    query.select(BusinessSearch.SELECT_COIN_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchCoinFlow;
