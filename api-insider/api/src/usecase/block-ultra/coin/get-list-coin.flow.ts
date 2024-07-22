import BusinessCoin     from '../../../core/business/block-ultra/logic/coin.logic';
import { ICoinService } from '../../../core/interfaces/coin';
import { CtrlUtil }     from '../../../core/utils/ctrl.util';

export class GetCoinListFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    if(sort_by == "priceChangeIn24h"){
      const query = await this.service.getQueryBuilder();
      query.where('price IS NOT NULL AND "histPrices" IS NOT NULL');
      query.select(["price", '"histPrices"', "key"]);
      const total = await query.getCount();
      CtrlUtil.applySearchQuery(search_key, 'key', query);
   
      const datas = await query.getRawMany();
      let result = BusinessCoin.calculatorAverage24h(datas);
      result = CtrlUtil.applySort(sort_by, sort_order, result);
   
      result = result.slice(0, 50);
      const coinKeys = result.map((x: any)=> x.key);

      const query2 = await this.service.getQueryBuilder();

      query2.where("key IN (:...keys)", {keys: coinKeys});
      let result2 = await query2.getMany();


      let dataResult = BusinessCoin.getCoinInList(result2);
      dataResult = CtrlUtil.applySort(sort_by, sort_order, dataResult);
      result2 = CtrlUtil.getPagingFormat(dataResult, page, limit, total); 
      return result2;
    }
    else {
      const query = await this.service.getQueryBuilder();
      query.where("'1'='1'");
      CtrlUtil.applySearchQuery(search_key, 'key', query);
      const sortField = sort_by == "average24h" ? "price": sort_by;
      CtrlUtil.applySortQuery(sortField, sort_order, query);
      CtrlUtil.applyPaginationQuery(limit, page, query);
      const datas = await query.getMany();
      const total = await query.getCount();
      const dataResult = BusinessCoin.getCoinInList(datas);
      const result = CtrlUtil.getPagingFormat(dataResult, page, limit, total); 
      return result;
    }
  }
}

export default GetCoinListFlow;
