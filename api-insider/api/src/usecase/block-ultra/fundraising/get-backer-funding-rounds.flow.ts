import { IFundraisingService } from '../../../core/interfaces/fundraising';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import BusinessBacker from '../../../core/business/block-ultra/logic/backer.logic';

export class GetBackerFundingRoundsFlow {
  constructor(private readonly service: IFundraisingService) {}

  async execute(params: {
    slug: string;
    search_key?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
  }) {
    const {
      slug,
      search_key = '',
      sort_by = '',
      sort_order = 'asc',
      limit = 10,
      page = 1,
    } = params;
    const query = await this.service.getQueryBuilder();
    query.where("EXISTS (SELECT 1 FROM json_array_elements(funds::json) AS item WHERE item->>'key' = :key)");
    query.setParameters({ key: slug });
    CtrlUtil.applySearchQuery(search_key || '', '', query);
    if (sort_by == 'backers') {
      query.orderBy('json_array_length(funds)', sort_order.toUpperCase());
    } else {
      CtrlUtil.applySortQuery(sort_by, sort_order, query);
    }
 
    CtrlUtil.applyPaginationQuery(limit, page, query);
    let datas = await query.getMany();
    datas = BusinessBacker.getFundingRound(datas);
    const total = await query.getCount();
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default GetBackerFundingRoundsFlow;
