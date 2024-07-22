import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { Coin }                   from '../../../core/schemas/home/coin';
import { Fundraising }            from '../../../core/schemas/home/fundraising';
import { Trending }               from '../../../core/schemas/home/trending';
import { Category }               from '../../../core/schemas/category';
import { Marquee }                from '../../../core/schemas/common/marquee';
import { IeoIdoProject }          from '../../../core/schemas/ieo-ido/ieo-ido-project';
import { ExchangeSpot }           from '../../../core/schemas/exchange/exchange-spot';
import { TokenUnlock }            from '../../../core/schemas/unlock/token-unlock';
import { Backer }                 from '../../../core/schemas/backer';
import { IeoIdoTopIdoLaunchPad }  from '../../../core/schemas/ieo-ido/ieo-ido-top-ido-launch-pad';

import { CoinService }                  from '../../../infrastructure/services/coin.service';
import { TrendingService }              from '../../../infrastructure/services/trending.service';
import { FundraisingService }           from '../../../infrastructure/services/fundraising.service';
import { CategoryService }              from '../../../infrastructure/services/category.service';
import { IeoIdoProjectService }         from '../../../infrastructure/services/ieo-ido-project.service';
import { TokenUnlockService }           from '../../../infrastructure/services/token-unlock.service';
import { BackerService }                from '../../../infrastructure/services/backer.service';
import { ExchangeSpotService }          from '../../../infrastructure/services/exchange-spot.service';
import { IeoIdoTopIdoLaunchPadService } from '../../../infrastructure/services/ieo-ido-top-ido-launch-pad.service';

import GlobalSearchCoinFlow from '../../../usecase/block-ultra/common/global-search-coin.flow';
import HeaderBarRuningFlow  from '../../../usecase/block-ultra/common/header-bar-runing.flow';

export class CommonCtrl {
  private globalSearchCoinFlow;
  private headerBarRuningFlow;

  constructor(private readonly em: EntityManager) {
    const coinService = new CoinService(this.em.getRepository(Coin));
    const fundraisingService = new FundraisingService(this.em.getRepository(Fundraising),);
    const trendingService = new TrendingService(this.em.getRepository(Trending),);
    const ieoIdoUpComingService = new IeoIdoProjectService(this.em.getRepository(IeoIdoProject),);
    const categoryService = new CategoryService(this.em.getRepository(Category),);
    const exchangeService = new ExchangeSpotService(this.em.getRepository(ExchangeSpot));
    const backerService = new BackerService(this.em.getRepository(Backer));
    const unlockService = new TokenUnlockService(this.em.getRepository(TokenUnlock));
    const launchpadService = new IeoIdoTopIdoLaunchPadService(this.em.getRepository(IeoIdoTopIdoLaunchPad));

    this.globalSearchCoinFlow = new GlobalSearchCoinFlow(
      coinService,
      fundraisingService,
      trendingService,
      ieoIdoUpComingService,
      categoryService,
      unlockService,
      backerService,
      launchpadService,
      exchangeService
    );
    this.headerBarRuningFlow = new HeaderBarRuningFlow(this.em.getRepository(Marquee));
  }

  async globalSearchCoin(ctx: Koa.Context, _next: Koa.Next) {
    let { name } = ctx.query;
    const datas = await this.globalSearchCoinFlow.execute(name as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async headerBarRuning(ctx: Koa.Context, _next: Koa.Next) {
    const data: any = await this.headerBarRuningFlow.execute();
    const response: any = {
      allCurrencies               : data.allCurrencies,
      btcDominanceChangePercent   : data.btcDominanceChangePercent,
      totalVolume24h              : data.totalVolume24h,
      totalMarketCapChangePercent : data.totalMarketCapChangePercent,
      totalVolume24hChangePercent : data.totalVolume24hChangePercent,
      btcDominance                : data.btcDominance,
      totalMarketCap              : data.totalMarketCap,
      gas                         : data.gas,
      fear_greed                  : {
                                    name: data.fear_greed.name,
                                    value_classification: data.fear_greed.now.value_classification,
                                    value: data.fear_greed.now.value
                                  },
      btc_long                    : data.btc_long,
      btc_mvrv                    : data.btc_mvrv,
      btc_realized_price          : data.btc_realized_price,
      btc_short                   : 100 - data.btc_long
    };
    ctx.status = 200;
    ctx.body = response;
  }
}
