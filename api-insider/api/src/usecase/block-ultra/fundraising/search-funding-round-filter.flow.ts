import { CtrlUtil } from '../../../core/utils/ctrl.util';
import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { IFundraisingService } from '../../../core/interfaces/fundraising';

export class SearchFundingRoundFilterFlow {
  constructor(private readonly service: IFundraisingService) {}

  async execute(slug: string) {
    const query = await this.service.getQueryBuilder();
    if (slug) {
      const searchKey = slug.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` });
      query.select(`DISTINCT ${BusinessSearch.SELECT_FUNDRAISING_PROPS}`);

    } else {
      CtrlUtil.applySortQuery("date", "desc", query); 
      query.select(BusinessSearch.SELECT_FUNDRAISING_PROPS);
    }
    query.limit(BusinessSearch.MAX_ITEM);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchFundingRoundFilterFlow;
