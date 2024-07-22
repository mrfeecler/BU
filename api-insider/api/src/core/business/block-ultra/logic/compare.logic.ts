export class BusinessCompare {
  static getCoinDetail(datas: any): any {
    return datas.map((c: any) => {
      const price = c.price ? parseFloat(c.price) : 0;
      const totalSupply = c.totalSupply ? parseFloat(c.totalSupply) : 0;

      let histprices = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histprices = c.histPrices['24H']['USD'];
        }
      }
      const coin = {
        key: c.key,
        name: c.name,
        image: c.image,
        symbol: c.symbol,
        rank: c.rank,
        price: price,
        price_change_in_24h:
          c.price && histprices ? (price / histprices - 1) * 100 : 0, 
        icon: c.icon,
        atlPrice: c.atlPrice,
        athPrice: c.athPrice,
        marketCap: c.marketCap,
        volume24h: c.volume24h,
        volMCap24h: c.volume24h && c.marketCap ? c.volume24h / c.marketCap : 0,
        histPrices: c.histPrices,
        percentOfCircSupply: c.percentOfCircSupply, 
        totalSupply: totalSupply ? c.totalSupply.toString() : '',
        links: c.links,
        tagIds: c.tagIds,
        description: c.description,
        histData: c.histData,
        maxSupply: c.maxSupply,
        chart: c.chart
      };
      return coin;
    });
  }
}
