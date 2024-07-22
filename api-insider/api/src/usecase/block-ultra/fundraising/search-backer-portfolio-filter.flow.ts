import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { ICoinService } from '../../../core/interfaces/coin';

export class SearchBackerPortfolioFilterFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(key: string, backer_id: number) {
    const query = await this.service.getQueryBuilder();
    query.where(
      ':fundId = ANY(SELECT value::text FROM json_array_elements_text("fundIds"::json))',
      { fundId: backer_id },
    );
    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :name', { key: `%${searchKey}%` }).limit(BusinessSearch.MAX_ITEM);
    } else {
      query.orderBy('"marketCap"', 'DESC', "NULLS LAST").take(20);
    }
    query.select(BusinessSearch.SELECT_COIN_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchBackerPortfolioFilterFlow;
