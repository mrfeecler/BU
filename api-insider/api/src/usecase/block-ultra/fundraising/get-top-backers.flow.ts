import BusinessBacker from '../../../core/business/block-ultra/logic/backer.logic'; 
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { IBackerService } from '../../../core/interfaces/backer';

export class GetTopBackersFlow {
  constructor(private readonly service: IBackerService) {}

  async execute(
    search_key: string, 
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
    sort_order2?: string,
  ) {
    if(sort_by == "gainers"){
      const query = await this.service.getQueryBuilder();
      const total = await query.getCount();
      query.where('gainers IS NOT NULL AND losers IS NOT NULL AND gainers > 0 AND losers > 0');
      let datas = await query.getMany();
      let dataResult = BusinessBacker.getTopBackers(datas);
      dataResult = CtrlUtil.applySort(sort_by, sort_order, dataResult);  
      dataResult = CtrlUtil.applyPagination(limit, page, dataResult);
      dataResult = CtrlUtil.getPagingFormat(dataResult, page, limit, total); 
      return dataResult;

    }else {
      const query = await this.service.getQueryBuilder();
      query.where("'1'='1'");
      CtrlUtil.applySearchQuery(search_key, 'slug', query);
      CtrlUtil.applySortQuery(sort_by, sort_order, query, sort_order2);
      CtrlUtil.applyPaginationQuery(limit, page, query);
      let datas = await query.getMany();
      const total = await query.getCount();
      datas = await this.service.fetchGainerLoser(datas);
      datas = await this.service.fetchMarketCap(datas);
      
      datas = BusinessBacker.getTopBackers(datas);
      const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
      return result;
    }

  }
}

export default GetTopBackersFlow;
