import BusinessSearchRule from '../../../core/business/block-ultra/rule/search.rule';
import { IFundraisingService } from '../../../core/interfaces/fundraising';

export class SearchBackerFundingRoundFlow {
  constructor(private readonly service: IFundraisingService) {}

  async execute(key: string, backer_id: number) {
    const query = await this.service.getQueryBuilder();
    query.where("EXISTS (SELECT 1 FROM json_array_elements(funds::json) AS item WHERE item->>'id' = :backer_id)");
    query.setParameters({ backer_id: backer_id }); 

    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` }).limit(BusinessSearchRule.MAX_ITEM);
    } else {
      query.orderBy('"date"', 'DESC').take(20);
    }
    const datas = await query.getMany();
    return datas;
  }
}

export default SearchBackerFundingRoundFlow;
