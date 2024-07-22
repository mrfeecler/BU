import { ICoinService } from '../../../core/interfaces/coin';
import BusinessGainerLoser from '../../../core/business/block-ultra/logic/gainer-loser.logic';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GetGainersListFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(limit: number) {
    const query = await this.service.getQueryBuilder("c");
    query.orderBy('c.marketCap', 'DESC', 'NULLS LAST');
    if(limit){
      query.limit(limit);
    }else {
      query.limit(500);
    }
    query.select(["key","price",'"histPrices"']);
    const topMarketCapCoins = await query.getRawMany();

    const dataWithPriceChange24h = BusinessGainerLoser.calculatorPriceChangeIn24(topMarketCapCoins);
    const dataSorted = CtrlUtil.applySort("priceChangeIn24", "desc", dataWithPriceChange24h); 
    const keys = dataSorted.map((c: any) => c.key); 
    const top10CoinIds = keys.slice(0, 20);
    const query2 = await this.service.getQueryBuilder();
    query2.where("key IN (:...ids)", {ids: top10CoinIds});
    query2.select(["key","name","image","symbol","price",'volume24h','"histPrices"']);
    const topCoins = await query2.getRawMany();
    const dataResult = BusinessGainerLoser.getGainerLoserProps(topCoins);
    const result = CtrlUtil.getPagingFormat(dataResult, 1, 20, 20);  
    return result;
  }
}

export default GetGainersListFlow;
