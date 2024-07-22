import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { ICoinService } from '../../../core/interfaces/coin';
import CmsBusinessCoin from '../../../core/business/cms/logic/coin.logic';
import { IVestingService } from '../../../core/interfaces/vesting';
import { ICoinFundraisingService } from '../../../core/interfaces/coin-fundraising';
import CmsBusinessFundraising from '../../../core/business/cms/logic/fundraising.logic';
import { IIeoIdoProjectService } from '../../../core/interfaces/ieo-ido-project';
import CmsBusinessPublicSale from '../../../core/business/cms/logic/public-sale.logic';
import { IExchangeDetailSpotService } from '../../../core/interfaces/exchange-detail-spot';

export class CrudCoinFlow {
  constructor(private readonly service: ICoinService, 
    private readonly vestingService: IVestingService, 
    private readonly fundraisingService: ICoinFundraisingService,
    private readonly ieoIdoProjectService: IIeoIdoProjectService,
    private readonly exchangeDetailSpotService: IExchangeDetailSpotService
  ) {}

  async create(item: any) {
    const result = await this.service.create(item);
    return { status: 'success', result };
  }

  async update(item: any) {
    const result = await this.service.update(item);
    return { status: 'success', result };
  }

  async deletes(item: any) {
    const result = await this.service.deletes(item);
    return { status: 'success', result };
  }

  async findOne(id: string) {
    const coin = await this.service.findOne(id);
    if(!coin){
      return null;
    }

    const query = await this.vestingService.getQueryBuilder('v');
    query.where({ coin_key: coin.key });
    query.leftJoinAndSelect('v.allocations', 'a')
    const vesting = await query.getOne();


    let funding_rounds   = await this.fundraisingService.getByCoinKey(coin.key);
    let markets          = await this.exchangeDetailSpotService.getByCoinKey(coin.key);
    let public_sales     = await this.ieoIdoProjectService.getByCoinKey(coin.key);
    const socials       : any = [];
    const teams         : any = [];
    const advisors      : any = [];
    const partners      : any = [];

    markets         = CmsBusinessCoin.getMarket(markets);
    public_sales    = CmsBusinessPublicSale.getPublicSaleProp(public_sales);
    funding_rounds  = CmsBusinessFundraising.getCoinFundraising(funding_rounds);
    const result    = CmsBusinessCoin.getCoinDetail(coin, funding_rounds, vesting, markets, public_sales,socials, teams, advisors, partners);
    return result;
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
    const sortField = sort_by == 'average24h' ? 'price' : sort_by;
    CtrlUtil.applySortQuery(sortField, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    const datas = await query.getMany();
    const total = await query.getCount();  
    
    const dataResult = CmsBusinessCoin.getCoinList(datas);
    const result = CtrlUtil.getPagingFormat(dataResult, page, limit, total); 
    return result;
  }
}

export default CrudCoinFlow;
