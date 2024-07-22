export class BusinessGainerLoser {
  static getGainerLoserProps(datas: any) {
    return datas.map((c: any) => {
      let histprices = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histprices = c.histPrices['24H']['USD'];
        }
      }
      return {
        key: c.key,
        name: c.name,
        price: c.price ? parseFloat(c.price): 0,
        priceChangeIn24: c.price && histprices
          ? (parseFloat(c.price) / histprices - 1) * 100
          : 0,
        volume24h: c.volume24h ? parseFloat(c.volume24h): 0,
        image: c.image,
        symbol: c.symbol,
      };
    });
  }
  static getGainerPercent(gainer: number, loser: number) {
    return (gainer / (gainer + loser)) * 100;
  }

  static getLoserPercent(gainer: number) {
    return 100 - gainer;
  }
}

export default BusinessGainerLoser;
