import { CtrlUtil } from '../../../../core/utils/ctrl.util';
import BusinessIeoIdo from '../../../../core/business/block-ultra/logic/ieo-ido.logic';
import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';

export class GetLaunchPadProjectFlow {
  constructor(
    private readonly service: IIeoIdoProjectService
  ) {}

  async execute(options: {
    key: string;
    status?: 'past' | 'upcoming';
    search_key?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
    is_hot: string;
  }) {
    const {
      key,
      search_key = '',
      sort_by = '',
      sort_order = 'asc',
      limit = 10,
      page = 1,
      status = 'past',
      is_hot = 'all',
    } = options;
    const query = await this.service.getQueryBuilder();
    query.where({ status }); 
    if (sort_by == 'launchpads') {
      query.orderBy('json_array_length(launchpads)', sort_order.toUpperCase());
    } else if (sort_by == 'backers') {
      query.orderBy('json_array_length(funds)', sort_order.toUpperCase());
    }  else {
      let sortField = sort_by;
      if (sort_by == 'category') {
        sortField = 'category_name';
      }
      CtrlUtil.applySortQuery(sortField, sort_order, query);
    }
    CtrlUtil.applySearchQuery(search_key, 'key', query);
    const keys = search_key.split(',');
    if(search_key == '' || keys.length > 1){
      query.andWhere(
        "EXISTS (SELECT 1 FROM json_array_elements(launchpads::json) AS item WHERE item->>'key' = :key)",
        { key },
      );
    }

    const datas = await query.getMany(); 
    let dataResult;
    if (status == 'past') {
      dataResult = BusinessIeoIdo.getLaunchPadDetailProjectEnded(datas);
    } else {
      dataResult = BusinessIeoIdo.getLaunchPadDetailProjectUpcoming(datas);
    }
    if (is_hot != 'all') {
      dataResult = dataResult.filter((item: any) => item.isHot);
    }
    dataResult = CtrlUtil.applyPagination(limit, page, dataResult);
    const total = await query.getCount();
    const result = CtrlUtil.getPagingFormat(dataResult, page, limit, total);
    return result;
  }
}

export default GetLaunchPadProjectFlow;
