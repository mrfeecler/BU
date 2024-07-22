import { ICategoryService } from '../../../core/interfaces/category';
import { ICoinService } from '../../../core/interfaces/coin';
import { IFundraisingService } from '../../../core/interfaces/fundraising';
import { IIeoIdoProjectService } from '../../../core/interfaces/ieo-ido-project';
import { ITrendingService } from '../../../core/interfaces/trending';

import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { ITokenUnlock } from '../../../core/interfaces/token-unlock';
import { IBackerService } from '../../../core/interfaces/backer';
import { IIeoIdoTopIdoLaunchPadService } from '../../../core/interfaces/ieo-ido-top-ido-launch-pad';
import { IExchangeSpot } from '../../../core/interfaces/exchange-spot';
export class GlobalSearchCoinFlow {
  constructor(
    private readonly coinService: ICoinService,
    private readonly fundraisingService: IFundraisingService,
    private readonly trendingService: ITrendingService,
    private readonly ieoIdoProjectService: IIeoIdoProjectService,
    private readonly categoryService: ICategoryService,
    private readonly unlockService : ITokenUnlock,
    private readonly backerService : IBackerService,
    private readonly launchpadService : IIeoIdoTopIdoLaunchPadService,
    private readonly exchangeService : IExchangeSpot
  ) {}

  async searchCoin(name: string){
    const coinQuery = await this.coinService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    coinQuery.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` }); 
    coinQuery.orWhere('LOWER(symbol) LIKE :name', { name: `%${searchKey}%` }); 
    coinQuery.orderBy('rank',"ASC","NULLS LAST");
    coinQuery.select(BusinessSearch.SELECT_COIN_PROPS);
    coinQuery.limit(10);
    console.log(coinQuery.getSql());
    
    const coins = await coinQuery.getRawMany();
    const coinResult = coins.map((c: any) => {
      let histprices = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histprices = c.histPrices['24H']['USD'];
        }
      }
      return {
        key: c.key,
        rank: c.rank,
        name: c.name,
        symbol: c.symbol,
        image: c.image,
        price: parseFloat(c.price),
        priceChangeIn24h: c.price &&  histprices ? (parseFloat(c.price) / histprices - 1) * 100: null,
      };
    });
    return coinResult;
  }

  async searchFundraising(name: string){
    const query = await this.fundraisingService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    query.orderBy('date',"DESC","NULLS LAST");
    query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` }).distinct(true);
    query.orWhere('LOWER(symbol) LIKE :name', { name: `%${searchKey}%`});
    query.select(['key', 'name', 'symbol', 'icon', 'date']).take(10);
    const result = await query.getRawMany();
    return result;
  }

  async searchCategory(name : string){
    const query = await this.categoryService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    query.orderBy('"market_cap"',"DESC","NULLS LAST");
    query.where("LOWER(name) LIKE :name", { name: `%${searchKey}%` });
    const categories = await query.select(BusinessSearch.SELECT_CATEGORY_PROPS).take(10).getRawMany();
    return categories;
  }

  async searchUpcoming(name: string){
    const query = await this.ieoIdoProjectService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    query.orderBy('start_date',"ASC","NULLS LAST");
    query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` });
    query.orWhere('LOWER(symbol) LIKE :name', { name: `%${searchKey}%`}); 
    query.select(BusinessSearch.SELECT_IEO_IDO_PROPS);
    const upcomings = await  query.take(10).getRawMany();
    return upcomings;
  }

  async searchExchange(name: string){
    const query = await this.exchangeService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` });
    query.orderBy('"volume24h"',"DESC","NULLS LAST");
    query.select(BusinessSearch.SELECT_EXCHANGE_SPOT_PROPS);
    const datas = await query.take(10).getRawMany();
    return datas;
  }

  async searchLaunchPad(name: string){
    const query = await this.launchpadService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` });
    query.orderBy('"marketCap"',"DESC","NULLS LAST");
    query.select(BusinessSearch.SELECT_IEO_IDO_TOP_LAUNCH_PAD_PROPS);
    const datas = await query.take(10).getRawMany();
    return datas;
  }

  async searchBacker(name: string){
    const query = await this.backerService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` }); 
    query.orderBy('tier',"ASC","NULLS LAST");
    query.addOrderBy('"totalInvestments"',"DESC","NULLS LAST");
    query.select(BusinessSearch.SELECT_TOPBACKER_PROPS);
    const datas = await query.take(10).getRawMany();
    return datas;
  }

  async searchUnlock(name: string){
    const query = await this.unlockService.getQueryBuilder();
    const searchKey = name.toLowerCase();
    query.where('LOWER(name) LIKE :name', { name: `%${searchKey}%` });
    query.orderBy('"date"',"ASC","NULLS LAST");
    query.select('key', 'name', 'image');
    const datas = await query.take(10).getRawMany();
    return datas;
  }

  async execute(name: string) {
    if (name) {
      const categories   = await this.searchCategory(name);
      const coins        = await this.searchCoin(name);
      const fundraisings = await this.searchFundraising(name);
      const upcomings    = await this.searchUpcoming(name);
      const exchanges    = await this.searchExchange(name);
      const launchpads   = await this.searchLaunchPad(name);
      const backers      = await this.searchBacker(name);
      const unlocks      = await this.searchUnlock(name);
      const result = {categories, coins, fundraisings, upcomings, exchanges, launchpads, backers, unlocks};
      return result;
    } else {
      const trendingQuery = await this.trendingService.getQueryBuilder("t");
      trendingQuery.innerJoinAndSelect('coins', 'c', 'c.key = t.key');
      trendingQuery.limit(BusinessSearch.DEFAULT_NUMBER_GLOBAL_SEARCH_RESULT);
      trendingQuery.select(['t.name', 't.key', 'c.symbol', 't.image', 'c.rank', 'c.price', 'c.histPrices']);
      let trendings = await trendingQuery.getRawMany();
      trendings = trendings.map((trending: any) => {
        let histprices = 0;
        if (trending.c_histPrices && '24H' in trending.c_histPrices) {
          if ('USD' in trending.c_histPrices['24H']) {
            histprices = trending.c_histPrices['24H']['USD'];
          }
        } 
        return {
          key: trending.t_key,
          rank: trending.c_rank,
          name: trending.t_name,
          symbol: trending.c_symbol,
          image: trending.t_image,
          price: parseFloat(trending.c_price),
          priceChangeIn24h: trending.c_price &&  histprices ? (parseFloat(trending.c_price) / histprices - 1) * 100: null,
        };
      });
      const result = { trendings };
      return result;
    }
  }
}

export default GlobalSearchCoinFlow;
