export class BusinessCategory {
  static getDetail(c: any): any {
    return {
      _id: c._id,
      id: c.id,
      slug: c.slug,
      name: c.name,
      gainers: c.gainers,
      losers: c.losers,
      gainer7d: c.gainer7d,
      loser7d: c.loser7d,
      gainer1m: c.gainer1m,
      loser1m: c.loser1m,
      market_cap: c.market_cap,
      volume24h: c.volume24h,
    };
  }
  static getHomeCategories(datas: any) {
    return datas.map((c: any) => {
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        market_cap: c.market_cap,
        volume24h: c.volume24h,
        dominance: c.dominance,
        gainers: c.gainers,
        losers: c.losers,
        avgPriceChange: c.avgPriceChange,
        marketCapChangeIn24h: c.yesterday && c.market_cap ? (c.market_cap / c.yesterday.marketCap - 1) * 1000: 0,
        volumeChangeIn24h: c.yesterday && c.volume24h ? (c.volume24h / c.yesterday.volume24h - 1) * 1000: 0,
        rankedCoins: c.rankedCoins,
        type: c.type
      };
    });
  }
  static getCatesBacker(datas: any, funds: any) {
    return datas.map((c: any) => {
      const findFund = funds.filter(
        (fund: any) => fund.category?.name === c.name,
      );
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        count: findFund.length,
      };
    });
  }
 
  static getCoinInList(datas: any) { 
    return datas.map((c: any) => {
      let histprices = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histprices = c.histPrices['24H']['USD'];
        }
      }
      return {
        id: c.id,
        key: c.key,
        image: c.image, 
        name: c.name,
        symbol: c.symbol,
        price: c.price ? parseFloat(c.price): 0,
        priceChangeIn24h: c.price && histprices ?  (parseFloat(c.price) / histprices - 1) / 100: 0,
        volume24h: c.volume24h,
        marketCap: c.marketCap,
        chart: c.chart,
      };
    });
  }

  static getCoinInListCr(datas: any) {
    return datas.map((c: any) => {
      let histprices = 0;
      let price = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histprices = c.histPrices['24H']['USD'];
        }
      }

      if (c.price && 'USD' in c.price) {
        price = c.price['USD']; 
      }
      return {
        id: c.id,
        key: c.key,
        image: c.image, 
        name: c.name,
        symbol: c.symbol,
        price: price,
        priceChangeIn24h: price && histprices ?  (price / histprices - 1) / 100: 0,
        volume24h: c.volume24h,
        marketCap: c.marketCap,
        chart: c.chart,
      };
    });
  }
}

export default BusinessCategory;
