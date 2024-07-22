import BusinessIeoIdo from '../../../../core/business/block-ultra/logic/ieo-ido.logic';
import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';
import { CtrlUtil } from '../../../../core/utils/ctrl.util';

export class GetIeoIdoListFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(
    status: string,
    is_hot: string,
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder('iip');
    query
      .leftJoin('fundraisings', 'f', 'iip.key = f.key')
      .select([
        'iip.*',
        "JSON_AGG(JSON_BUILD_OBJECT('fundraising_id', f._id, 'raised', f.raise)) AS fundraisings",
      ])
      .groupBy('iip._id');

    query.where({ status });
    if(status == "upcoming"){
      query.andWhere('start_date > CURRENT_DATE');
    }
    if (search_key) {
      const keys = search_key.split(',');
      if (keys.length > 1) {
        query.andWhere(`iip.key IN (:...keys)`, { keys });
      } else {
        query.andWhere(`iip.key = :key`, { key: keys[0] });
      }
    }
    if (sort_by == 'backers') {
      query.orderBy('json_array_length(iip.funds)', sort_order.toUpperCase());
    } else if (sort_by == 'launchpads') {
      query.orderBy('json_array_length(launchpads)', sort_order.toUpperCase());
    } else {
      CtrlUtil.applySortQuery(sort_by, sort_order, query);
    }
    
    if (is_hot == 'hot') {
      let datas = await query.getRawMany();
      datas = BusinessIeoIdo.getIeoIdoUpcoming(datas);
      datas = datas.filter((item: any) => item.isHot);
      datas = CtrlUtil.applyPagination(limit, page, datas);
      const res = CtrlUtil.getPagingFormat(datas, page, limit, datas.length);
      return res;
    } else {
      CtrlUtil.applyPaginationQuery(limit, page, query);
      let datas = await query.getRawMany();
      const total = await query.getCount();
      datas = BusinessIeoIdo.getIeoIdoUpcoming(datas);
      const res = CtrlUtil.getPagingFormat(datas, page, limit, total);
      return res;
    }
  }
}

export default GetIeoIdoListFlow;
