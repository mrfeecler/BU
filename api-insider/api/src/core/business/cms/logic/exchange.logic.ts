 export class CmsBusinessExchange {

  static getExchangeDetail(data: any, allocations: any, totalCoins: any, coin: any){
    return {
      icon                     : data.icon,
      name                     : data.name,
      tier                     : 1,
      yearOfFoundation         : data.foundationYear,
      country                  : data.country,
      links                    : data.links,
      marketShare              : parseFloat(data.percentVolume),
      financialReserves        : parseFloat(data.reserves),
      coinsCount               : parseInt(data.currenciesCount),
      pairsCount               : parseInt(data.pairsCount),
      nativeCoin               : coin ? {
                                    key: data.nativeCoinKey,
                                    logo : coin ? coin.image.icon : "",
                                    name : coin ? coin.name : ""
                                 }: null,
      fees                     : "",
      tokenAllocation          : allocations,
      spotTradingVolume        : {
                                    usd     :  data.reportedVolumes.day.toUSD,
                                    percent : (data.reportedVolumes.day.toBTC / data.reportedVolumes.day.toBTC - 1) * 100,
                                    btc     :  data.reportedVolumes.day.toBTC
                                 },
      totalUsdVolume           : totalCoins
    }
  }
  static getExchangeList(datas: any) {
    return datas.map((c: any) => { 
      return {
        _id              : c._id,
        key              : c.key,
        icon             : c.icon, 
        name             : c.name,
        tier             : 1,
        volume24h        : c.volume24h,
        currenciesCount  : c.currenciesCount,
        country          : c.country,
        percentVolume    : c.percentVolume,
      };
    });
  }
 
}

export default CmsBusinessExchange;
