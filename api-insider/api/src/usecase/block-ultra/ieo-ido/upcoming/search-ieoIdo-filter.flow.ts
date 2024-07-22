import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';
import BusinessSearch from '../../../../core/business/block-ultra/rule/search.rule';

export class SearchIeoIdoFilterFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` });
    } else {
      query.orderBy('start_date', 'ASC');
    }
    query.limit(BusinessSearch.MAX_ITEM);
    query.select(BusinessSearch.SELECT_IEO_IDO_UPCOMING_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchIeoIdoFilterFlow;
