import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { Coin }                   from '../../../core/schemas/home/coin';
import { Vesting }                from '../../../core/schemas/coin-detail/tokenomic/vesting';
import { Allocation }             from '../../../core/schemas/coin-detail/tokenomic/allocation';
import { CoinIeoIdo }             from '../../../core/schemas/coin-detail/ieo-ido/coin-ieo-ido';
import { Tag }                    from '../../../core/schemas/common/tag';
import { Backer }                 from '../../../core/schemas/backer';
import { Marquee }                from '../../../core/schemas/common/marquee';
import { CoinMarketSpot }         from '../../../core/schemas/coin-detail/market/coin-market-spot';
import { CoinFundraising }        from '../../../core/schemas/coin-detail/fundraising/coin-fundraising';
import { CoinMarketHistorical }   from '../../../core/schemas/coin-detail/market/coin-market-historical';

import { CoinService }               from '../../../infrastructure/services/coin.service';
import { CoinIeoIdoService }         from '../../../infrastructure/services/coin-ieo-ido.service';
import { TagService }                from '../../../infrastructure/services/tag.service';
import { BackerService }             from '../../../infrastructure/services/backer.service';
import { VestingService }            from '../../../infrastructure/services/vesting.service';
import { AllocationService }         from '../../../infrastructure/services/allocation.service';
import { CoinSpotService }           from '../../../infrastructure/services/coin-spot.service';
import { CoinHistoricalService }     from '../../../infrastructure/services/coin-historical.service';
import { CoinFundraisingService }    from '../../../infrastructure/services/coin-fundraising.service';

import GetCoinDetailFlow            from '../../../usecase/block-ultra/coin/get-coin-detail.flow';
import GetCoinDetailUnlockFlow      from '../../../usecase/block-ultra/coin/get-coin-detail-unlock.flow';
import GetTagNameFlow               from '../../../usecase/block-ultra/category/get-tag-name-list.flow';
import GetCoinListFlow              from '../../../usecase/block-ultra/coin/get-list-coin.flow';
import GetHeaderRun                 from '../../../usecase/block-ultra/common/header-bar-runing.flow';
import SearchCoinFlow               from '../../../usecase/block-ultra/coin/search-coin.flow';
import GetCoinVestingFlow           from '../../../usecase/block-ultra/coin/get-coin-vesting.flow';
import GetCoinIeoIdoFlow            from '../../../usecase/block-ultra/coin/get-coin-ieoido.flow';
import GetCoinFundraisingFlow       from '../../../usecase/block-ultra/coin/get-coin-fundraising.flow';
import GetHistoricalFlow            from '../../../usecase/block-ultra/coin-info/get-historical.flow';
import GetCoinSpotFlow              from '../../../usecase/block-ultra/coin-info/get-spot.flow';
import SearchMarketSpotFlow         from '../../../usecase/block-ultra/coin-info/search-market-spot.flow';

 
export class CoinCtrl {

  private coinService;
  private coinFundraisingService;
  private coinSpotService;
  private historicalService;
  private coinIeoIdoService;
  private vestingService;

  private getCoinVestingFlow;
  private getCoinIeoIdoFlow;
  private getCoinFundraisingFlow;
  private getCoinDetailFlow; 
  private getCoinDetailUnlockFlow; 
  private getTagNameFlow;
  private getCoinListFlow;
  private getHeaderRunFlow;
  private searchCoinFlow;
  private searchMarketSpotFlow;
  private getHistoricalFlow;
  private getSpotFlow;
  
  constructor(private readonly em: EntityManager) {
    this.coinService                = new CoinService(this.em.getRepository(Coin)); 
    this.coinSpotService            = new CoinSpotService(this.em.getRepository(CoinMarketSpot));
    this.historicalService          = new CoinHistoricalService(this.em.getRepository(CoinMarketHistorical));
    this.coinIeoIdoService          = new CoinIeoIdoService(this.em.getRepository(CoinIeoIdo));
    this.coinFundraisingService     = new CoinFundraisingService(this.em.getRepository(CoinFundraising));
    this.vestingService             = new VestingService(this.em.getRepository(Vesting));
 
    const allocationService         = new AllocationService(this.em.getRepository(Allocation));
    const backerService             = new BackerService(this.em.getRepository(Backer));
    const tagService                = new TagService(this.em.getRepository(Tag));

    this.getCoinFundraisingFlow     = new GetCoinFundraisingFlow(this.coinFundraisingService, this.coinService);
    this.getCoinDetailFlow          = new GetCoinDetailFlow( this.coinService,this.coinIeoIdoService,backerService, this.coinFundraisingService);
    this.getCoinDetailUnlockFlow    = new GetCoinDetailUnlockFlow(this.vestingService,allocationService);
    this.getCoinVestingFlow         = new GetCoinVestingFlow(this.vestingService,allocationService);
    this.getCoinIeoIdoFlow          = new GetCoinIeoIdoFlow(this.coinIeoIdoService, this.coinService);
  
    this.getTagNameFlow             = new GetTagNameFlow(tagService);
    this.getCoinListFlow            = new GetCoinListFlow(this.coinService);
    this.getHeaderRunFlow           = new GetHeaderRun(this.em.getRepository(Marquee));
    this.searchCoinFlow             = new SearchCoinFlow(this.coinService);
    this.searchMarketSpotFlow       = new SearchMarketSpotFlow(this.coinSpotService); 
    this.getHistoricalFlow          = new GetHistoricalFlow(this.historicalService); 
    this.getSpotFlow                = new GetCoinSpotFlow(this.coinSpotService);
  }

  async getListCoin(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key, sort_by, sort_order, limit, page } = ctx.query;
    sort_by = sort_by ? sort_by : 'marketCap';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getCoinListFlow.execute(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async findOne(ctx: Koa.Context, _next: Koa.Next) {
    const { coin_key } = ctx.query;
    const coin = await this.getCoinDetailFlow.execute(coin_key as string);
    if (!coin) {
      ctx.status = 404;
      ctx.body = "Find not found";
    } else {
      try {
        const header        = await this.getHeaderRunFlow.execute();
        const subCategories = await this.getTagNameFlow.execute(coin.tagIds);
        const spots         = await this.coinSpotService.getCountByKey(coin_key as string);
        const historicals   = await this.historicalService.getCountByKey(coin_key as string);
        const fundraisings  = await this.coinFundraisingService.getCountByKey(coin_key as string);
        
        const ieoido        = await this.coinIeoIdoService.getCountByKey(coin_key as string);
        const tokenomics    = await this.vestingService.getCountByKey(coin_key as string);
        const unlock        = await this.getCoinDetailUnlockFlow.execute(coin, "round");
        const tokenUnlock   = unlock ?  {
                              unlockChartUnlocked     : unlock.totalUnlockedPercent,
                              unlockChartNextUnlock   : unlock.totalNextUnlockPercent,
                              unlockChartLocked       : unlock.totalLockedPercent,
                              unlockChartRemainingTime: unlock.totalRemainingTime,
                            } : null;
        const coinIeoIdo = await this.getCoinIeoIdoFlow.execute(coin_key as string);

        const publicSale = {
          ieoido_price: coinIeoIdo.ieoidos.length > 0 ? coinIeoIdo.ieoidos[0].price.USD: 0,
          time_end: coinIeoIdo.ieoidos.length > 0 ? coinIeoIdo.ieoidos[0].time_end: "",
          time_start: coinIeoIdo.ieoidos.length > 0 ? coinIeoIdo.ieoidos[0].time_start: "",
          type: coinIeoIdo.ieoidos.length > 0 ? coinIeoIdo.ieoidos[0].type: ""
        }
        let result = {
          ...coin,
          tokenUnlock,
          header,
          subCategories,
          fundraisings,
          spots,
          historicals,
          tokenomics,
          ieoido,
          publicSale,
          unlocks: unlock ? 1: 0
        }; 
        ctx.status = 200;
        ctx.body = result;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getCoinUnlock(ctx: Koa.Context, _next: Koa.Next) {
    const { coin_key, status } = ctx.query;
    const coin  = await this.coinService.findByCoinKey(coin_key as string);
    const datas = await this.getCoinDetailUnlockFlow.execute(coin, status as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async getCoinTokenomics(ctx: Koa.Context, _next: Koa.Next) {
    const { coin_key } = ctx.query;
    const res = await this.getCoinVestingFlow.execute(coin_key as string);
    ctx.status = 200;
    ctx.body = res;
  }

  async getCoinFundraising(ctx: Koa.Context, _next: Koa.Next) {
    const { coin_key } = ctx.query;
    const res = await this.getCoinFundraisingFlow.execute(coin_key as string);
    ctx.status = 200;
    ctx.body = res;
  }

  async getCoinIeoIdo(ctx: Koa.Context, _next: Koa.Next) {
    const { coin_key } = ctx.query;
    const res = await this.getCoinIeoIdoFlow.execute(coin_key as string);
    ctx.status = 200;
    ctx.body = res;
  }

  async search(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const res = await this.searchCoinFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = res;
  }

  async searchMarketSpot(ctx: Koa.Context, _next: Koa.Next) {
    let { key, search_key  } = ctx.query;
    const datas = await this.searchMarketSpotFlow.execute(search_key as string, key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async getMarketHistorical(ctx: Koa.Context, _next: Koa.Next){
    let { sort_by,sort_order,limit,page,coin_key,date_from,date_to} = ctx.query;
    sort_by    = sort_by    ? sort_by    : 'date';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getHistoricalFlow.execute({
      sort_by: sort_by as string,
      sort_order: sort_order as 'asc' | 'desc',
      limit: parseInt(limit as string),
      page: parseInt(page as string),
      dateFrom: date_from as string,
      dateTo: date_to as string,
      coin_key: coin_key as string,
    });
    ctx.status = 200;
    ctx.body = datas;
  }

  async getMarketSpot(ctx: Koa.Context, _next: Koa.Next){
    let { sort_by, sort_order, limit, page, coin_key, search_key, type } = ctx.query;
    sort_by    = sort_by    ? sort_by    : 'usdVolume';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getSpotFlow.execute(
      coin_key as string,
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string),
      parseInt(page as string),
      type as string,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async getAllCoinKey(ctx: Koa.Context, _next: Koa.Next){
    const repo = this.em.getRepository(Coin);
    const query = await repo.createQueryBuilder();
    let keys = await query.select(["key"]).getRawMany();
    keys = keys.map( (item) => item.key);
    ctx.status = 200;
    ctx.body = keys;
  }
}
