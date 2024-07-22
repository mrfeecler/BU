import { IIeoIdoTopIdoLaunchPadService } from '../../../core/interfaces/ieo-ido-top-ido-launch-pad';
import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';

export class SearchUnlockFlow {
  constructor(private readonly service: IIeoIdoTopIdoLaunchPadService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      const searchKey = key.toLowerCase();
      query.where('LOWER(name) LIKE :key', { key: `%${searchKey}%` });
    } else {
      query.orderBy('"marketCap"', 'ASC').take(20);
    }
    query.select(BusinessSearch.SELECT_TOKEN_UNLOCK_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchUnlockFlow;
