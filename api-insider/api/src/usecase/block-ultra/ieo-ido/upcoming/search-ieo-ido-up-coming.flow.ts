import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';
import BusinessSearch from '../../../../core/business/block-ultra/rule/search.rule';

export class SearchIeoIdoUpComingFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    query.where({ status: 'upcoming' });
    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` });
    } else {
      query.orderBy('start_date', 'DESC', "NULLS LAST");
    }
    query.andWhere('start_date > CURRENT_DATE');
    query.select(BusinessSearch.SELECT_IEO_IDO_UPCOMING_PROPS);
    query.limit(BusinessSearch.MAX_ITEM);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchIeoIdoUpComingFlow;
