import BusinessSearchRule from '../../../../core/business/block-ultra/rule/search.rule';
import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';

export class SearchLaunchPadDetailUpcomingFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(key: string, search_key: string, status: string) {
    const query = await this.service.getQueryBuilder();
    query.where(
      "EXISTS (SELECT 1 FROM json_array_elements(launchpads::json) AS item WHERE item->>'key' = :key)",
      { key },
    );
    query.andWhere({ status });
    if (search_key) {
      const searchKey = search_key.toLowerCase();
      query.where('LOWER(name) LIKE :search_key', { search_key: `%${searchKey}%` });
    } else {
      query.orderBy('start_date', 'DESC', "NULLS LAST");
    }
    query.limit(BusinessSearchRule.MAX_ITEM);
    query.select(["image", "symbol", "key", "name"]);
    const datas = await query.getRawMany(); 
    return datas;
  }
}

export default SearchLaunchPadDetailUpcomingFlow;
