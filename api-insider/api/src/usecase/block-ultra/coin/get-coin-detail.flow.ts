import { ICoinFundraisingService } from '../../../core/interfaces/coin-fundraising';
import BusinessCoin from '../../../core/business/block-ultra/logic/coin.logic';
import { IBackerService }     from '../../../core/interfaces/backer';
import { ICoinService }       from '../../../core/interfaces/coin';
import { ICoinIeoIdoService } from '../../../core/interfaces/coin-ieo-ido'; 

export class GetCoinDetailFlow {
  constructor(
    private readonly coinService: ICoinService,
    private readonly coinIeoIdoService: ICoinIeoIdoService,
    private readonly backerService: IBackerService,
    private readonly coinFundraisingService: ICoinFundraisingService
  ) {}
  async execute(coin_key: string) {
    const query = await this.coinService.getQueryBuilder();
    query.where('key = :coin_key', { coin_key });
    let coin = await query.getOne();
    if (!coin) { 
      coin                      = await this.coinService.createCoinDetail(coin_key);
    }else {
      coin                      = await this.coinService.updateCoinDetail(coin);
    }
    const coinFundraisings     = await this.coinFundraisingService.getByCoinKey(coin_key);
    const overview = BusinessCoin.getOverviewFundraising(coinFundraisings, 0, [], [], coin.totalSupply);

    const rank_coin_in_wallet = await this.coinService.getRankCoinInCategory(coin.key);
    const compare             = await this.coinService.getCompare(coin_key, coin.category);
    const backers             = await this.backerService.getBackers(coin.fundIds);
    const idoPrice            = await this.coinIeoIdoService.findIdoPrice(coin.key);
    coin = BusinessCoin.getCoinDetail(coin, rank_coin_in_wallet, idoPrice, backers);
    const earlyStagePricePrice = this.findPrice(overview.pricePerRoundPrice);
    const earlyStagePriceRound = coinFundraisings.length > 0 ? coinFundraisings[0].type : "";
    const result = { ...coin, 
      compare, totalFundRaised: overview.totalFundRaised, avgPrice: overview.avgPrice, earlyStagePricePrice, earlyStagePriceRound  };
    return result;
  }

  private findPrice(pricePerRoundPrices: any){
    let price = pricePerRoundPrices[0];
    pricePerRoundPrices.forEach((c: any) => {
        if(c){
          price = c;
        }
    });
    return price;
  }
}

export default GetCoinDetailFlow;
