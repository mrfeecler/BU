import BusinessTrending from '../../../core/business/block-ultra/logic/trending.logic';
import { ITrendingService } from '../../../core/interfaces/trending';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GetTrendingListFlow {
  constructor(private readonly service: ITrendingService) {}

  async execute(
    limit: number,
    page: number,
    sort_by: string,
    sort_order: 'asc' | 'desc',
  ) {
    if(sort_by == "average24h"){
      const query = await this.service.getQueryBuilder("a");
      query.innerJoin('coins', 'c', 'a.key = c.key');
      query.select(['c.key','c.price', 'c.histPrices']);
      const datas = await query.getRawMany();
      const total = datas.length;
      let result = BusinessTrending.getHomeTrendings(datas);
      result = CtrlUtil.applySort(sort_by, sort_order, result);
      result = result.slice(0, 50);
      const keys = result.map((item: any) => item.key);

      const query2 = await this.service.getQueryBuilder("td");
      query2.innerJoin('coins', 'c', 'td.key = c.key');
      query2.select(['c._id' ,'c.key', 'c.name', 'c.price', 'c.symbol', 'c.image', 'c.volume24h', 'c.chart', 'c.marketCap', 'c.histPrices']);
      query2.where('c.key IN (:...keys)', {keys});
      const datas2 = await query2.getRawMany();
      let result2 = BusinessTrending.getHomeTrendings(datas2);
      result2 = CtrlUtil.applySort(sort_by, sort_order, result2);
      const res = CtrlUtil.getPagingFormat(result2, page, limit, total);
      return res;
    } else {
      const query = await this.service.getQueryBuilder("td");
      query.innerJoin('coins', 'c', 'td.key = c.key');
      query.where("'1'='1'");
      CtrlUtil.applySortQuery(sort_by, sort_order, query);
      CtrlUtil.applyPaginationQuery(limit, page, query);
      query.select(['c._id' ,'c.key', 'c.name', 'c.price', 'c.symbol', 'c.image', 'c.volume24h', 'c.chart', 'c.marketCap', 'c.histPrices']);
      const datas = await query.getRawMany();
      const total = await query.getCount();
      const result = BusinessTrending.getHomeTrendings(datas);
      const res = CtrlUtil.getPagingFormat(result, page, limit, total);
      return res;
    }
  }
}

export default GetTrendingListFlow;
