import { NumberUtil } from "src/core/utils/number.util";

export class BusinessGainerLoser {

  static calculatorPriceChangeIn24(datas: any){
    return datas.map((c: any) => {
      let histprices = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histprices = c.histPrices['24H']['USD'];
        }
      }
      return {
        key: c.key, 
        priceChangeIn24: c.price && histprices
          ? (parseFloat(c.price) / histprices - 1) * 100
          : 0,
      };
    });
  }

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
        price: c.price ? parseFloat(c.price) : 0,
        priceChangeIn24: c.price && histprices
          ? (parseFloat(c.price) / histprices - 1) * 100
          : 0,
        volume24h: c.volume24h ? parseFloat(c.volume24h): 0,
        image: c.image,
        symbol: c.symbol,
      };
    });
  }
  static getGainerPercent(category: any, time: string) {
     switch (time) {
      case "7d":
        return category.gainer7d / (category.gainer7d + category.loser7d) * 100;
      case "1m":
        return category.gainer1m / (category.gainer1m + category.loser1m) * 100;
      default:
        return category.gainers / (category.gainers + category.losers) * 100;
     }
  }

  static getLoserPercent(category: any, time: string) {
    switch (time) {
      case "7d":
        return 100 - (category.gainer7d / (category.gainer7d + category.loser7d) * 100);
      case "1m":
        return 100 - (category.gainer1m / (category.gainer1m + category.loser1m) * 100);
      default:
        return 100 - (category.gainers / (category.gainers + category.losers) * 100);
     }
  }
}

export default BusinessGainerLoser;
