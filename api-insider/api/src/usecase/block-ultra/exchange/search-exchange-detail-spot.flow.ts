import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { IExchangeDetailSpotService } from '../../../core/interfaces/exchange-detail-spot';

export class SearchExchangeDetailSpotFlow {
  constructor(private readonly service: IExchangeDetailSpotService) {}

  async execute(key: string, name: string) {
    const query = await this.service.getQueryBuilder('eds');
    query.where({ exchangeKey: key });
    query
      .select([
        'MAX(hc.icon) AS image',
        'MAX(eds.coinName) AS coinName',
        'eds.coinKey AS coinKey',
        'MAX(eds.symbol) AS symbol',
        'MAX(eds.usdLast) AS usdLast',
        'MAX(eds.changePercent) AS changePercent',
        'MAX(eds.usdVolume) AS usdVolume',
        'MAX(eds.exchangePercentVolume) AS exchangePercentVolume',
      ])
      .innerJoin('coins', 'hc', 'eds.coinKey = hc.key')
      .groupBy('eds.coinKey');

    if (name) {
      const searchKey = name.toLowerCase(); 
      query.andWhere("LOWER(eds.coinName) LIKE :name", { name: `%${searchKey}%` });
    }  
    let datas = await query.getRawMany();
    if (!name) {
      datas = datas.map((item: any) => {
        item.usdvolume = parseFloat(item.usdvolume);
        return item;
      })
      datas = CtrlUtil.applySort("usdvolume",  "desc", datas);
      datas = datas.slice(0, 20);
    }  
    return datas;
  }
}

export default SearchExchangeDetailSpotFlow;
