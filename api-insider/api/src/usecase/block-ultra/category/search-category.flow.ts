import { CtrlUtil } from '../../../core/utils/ctrl.util';
import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule'; 
import { ICategoryService } from '../../../core/interfaces/category';

export class SearchCategoryFlow {
  constructor(private readonly service: ICategoryService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();

    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` }).limit(BusinessSearch.MAX_ITEM);
    } else {
      CtrlUtil.applySortQuery('type,market_cap', 'asc', query, "desc");
    }
    query.select(BusinessSearch.SELECT_CATEGORY_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchCategoryFlow;
