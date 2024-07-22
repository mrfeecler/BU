import { IIeoIdoTopIdoLaunchPadService } from '../../../../core/interfaces/ieo-ido-top-ido-launch-pad';
import BusinessSearch from '../../../../core/business/block-ultra/rule/search.rule';

export class SearchIeoIdoTopIdoLaunchPadFlow {
  constructor(private readonly service: IIeoIdoTopIdoLaunchPadService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    query.where({ type: 'IDO' })
    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` });
    } else {
      query.orderBy('"marketCap"', 'DESC', "NULLS LAST");
    }
    query.select(BusinessSearch.SELECT_IEO_IDO_TOP_LAUNCH_PAD_PROPS);
    query.limit(BusinessSearch.MAX_ITEM);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchIeoIdoTopIdoLaunchPadFlow;
