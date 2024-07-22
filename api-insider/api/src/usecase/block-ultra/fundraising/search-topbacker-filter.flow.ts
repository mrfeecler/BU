import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { IBackerService } from '../../../core/interfaces/backer';

export class SearchTopBackerFilterFlow {
  constructor(private readonly service: IBackerService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` }).limit(BusinessSearch.MAX_ITEM);
    } else {
      query.orderBy('tier', 'ASC', "NULLS LAST").addOrderBy('"totalInvestments"', "DESC", "NULLS LAST");
    }
    query.select(BusinessSearch.SELECT_TOPBACKER_PROPS);
    query.take(20);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchTopBackerFilterFlow;
