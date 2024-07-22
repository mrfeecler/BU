import { CtrlUtil } from '../../../core/utils/ctrl.util'; 
import CmsBusinessLaunchpad from '../../../core/business/cms/logic/launchpad.logic';
import { IBlockchainService } from '../../../core/interfaces/blockchain.service';

export class CrudBlockchainFlow {
  private readonly service;
  constructor(_service: IBlockchainService) {
    this.service = _service;
  }

  async findOne(id: string) {
    const result = await this.service.findOne(id);
    return result;
  }
  
  async create(item: any) {
    const result = await this.service.create(item);
    return { status: 'success', result };
  }

  async update(item: any) {
    const result = await this.service.create(item);
    return { status: 'success', result };
  }

  async deletes(ids: any) {
    const result = await this.service.deletes(ids);
    return { status: 'success', result };
  }

  async list(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where("'1'='1'");
    CtrlUtil.applySearchQuery(search_key, 'key', query); 
    CtrlUtil.applySortQuery(sort_by, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    const datas = await query.getMany();
    const total = await query.getCount();
    const dataResult = CmsBusinessLaunchpad.getLaunchpadList(datas);
    const result = CtrlUtil.getPagingFormat(dataResult, page, limit, total);  
    return result;
  }
}

export default CrudBlockchainFlow;
