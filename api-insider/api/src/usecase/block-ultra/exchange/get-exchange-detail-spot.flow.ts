import { IExchangeDetailSpotService } from '../../../core/interfaces/exchange-detail-spot';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import BusinessExchange from '../../../core/business/block-ultra/logic/exchange.logic';

export class GetExchangeDetailSpotFlow {
  constructor(private readonly service: IExchangeDetailSpotService) {}
  async execute(
    key: string,
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
    type: string,
  ) {
    const query = await this.service.getQueryBuilder('eds');
    query.where({ exchangeKey: key });
    if (type && type.toUpperCase() != 'ALL') {
      query.andWhere('exchangeGroup=:type', {
        type: type.toUpperCase() == 'CEX' ? 'main' : 'dex',
      });
    }
    query
      .select([
        'DISTINCT eds.coinKey AS coinKey',
        'hc.icon AS image',
        'eds.coinName AS coinName',
        'eds.symbol AS symbol',
        'eds.usdLast AS usdLast',
        'eds.changePercent AS changePercent',
        'eds.usdVolume AS usdVolume',
        'eds.exchangePercentVolume AS exchangePercentVolume',
      ])
      .innerJoin('coins', 'hc', 'eds.coinKey = hc.key');

    CtrlUtil.applySearchQuery(search_key, 'coinKey', query);


    const datas = await query.getRawMany();
    let result = BusinessExchange.getExchangeDetailSpotList(datas);
    result = CtrlUtil.applySort(sort_by, sort_order, result);
    const dataResult = CtrlUtil.applyPagination(limit, page, result);
    const res = CtrlUtil.getPagingFormat(
      dataResult,
      page,
      limit,
      result.length,
    );
    return res;
  }
}
export default GetExchangeDetailSpotFlow;
