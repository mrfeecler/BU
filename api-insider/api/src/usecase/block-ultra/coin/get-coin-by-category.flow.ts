import { UrlUtil } from '../../../core/utils/url.util';
import BusinessCategory from '../../../core/business/block-ultra/logic/category.logic';
import { ICoinService } from '../../../core/interfaces/coin';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { AxiosService } from '../../../infrastructure/services/axios.service';

export class GetCoinByCategoryFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(
    categoryId: number,
    search_key: string = '',
    sort_by: string = '',
    sort_order?: 'asc' | 'desc',
    limit?: number,
    page?: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where({ categoryId });
    const total = await query.getCount();
    if(total > 0){
      let result;
      CtrlUtil.applySearchQuery(search_key, 'key', query); 
      if(sort_by == "priceChangeIn24h"){
        query.select(['key', 'price', '"histPrices"']);
        const datas = await query.getRawMany();
        let coins = BusinessCategory.getCoinInList(datas);
        coins = CtrlUtil.applySort(sort_by, sort_order || 'asc', coins);
        const coinKeys = coins.map((c: any)=>c.key).slice(page, limit);

        const query2 = await this.service.getQueryBuilder();
        query2.where("key IN (:...keys)", {keys: coinKeys});
        const res = await query2.getMany();
        let coinList = BusinessCategory.getCoinInList(res);
        result = CtrlUtil.getPagingFormat(
          coinList,
          page || 1,
          limit || 10,
          total,
        );
      } else {
     
        CtrlUtil.applySortQuery(sort_by, sort_order || 'asc', query);
        CtrlUtil.applyPaginationQuery(limit || 10, page || 1, query);
        const datas = await query.getMany();
        const coins = BusinessCategory.getCoinInList(datas);
        result = CtrlUtil.getPagingFormat(
          coins,
          page || 1,
          limit || 10,
          total,
        );
      }

     
      return result;
    } else {
      const url = UrlUtil.getCoinInCategory(categoryId);
      const response = await AxiosService.get(url);
      if (response.data.data.length == 0) {
        return [];
      }
      const dataResult = BusinessCategory.getCoinInListCr(response.data.data);
      const res = CtrlUtil.applyPagination(limit, page, dataResult);
      const result = CtrlUtil.getPagingFormat(
        res,
        page || 1,
        limit || 10,
        dataResult.length,
      );
      return result;
    }

  }
}

export default GetCoinByCategoryFlow;
