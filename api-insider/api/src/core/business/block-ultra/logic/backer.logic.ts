export class BusinessBacker {

  static calculatorGainerLoser(datas: any){
    return datas.map((c: any) => {
      const gainerPercent = c.gainers ? c.gainers/(c.gainers + c.losers) *100 : 0
      return {
        slug            : c.slug,
        gainers         : gainerPercent,
        losers          : c.losers  ? 100 - gainerPercent : 0
      };
    });
  }
  static getTopBackers(datas: any){
    return datas.map((c: any) => {
      const lastMarketCap = c.market_caps && c.market_caps.length > 0 ? c.market_caps[c.market_caps.length - 1].marketCap: null;
      const gainerPercent = c.gainers ? c.gainers/(c.gainers + c.losers) *100 : 0
      return {
        id              : c.id,
        logo            : c.logo,
        slug            : c.slug,
        name            : c.name,
        tier            : c.tier,
        type            : c.type,
        country         : c.location,
        investments     : c.totalInvestments,
        marketCap       : c.last_market_cap ? c.last_market_cap : 0,
        mCapChangeIn24h : lastMarketCap ? (lastMarketCap/ c.market_caps[c.market_caps.length - 24].marketCap - 1) * 100: 0,
        resources       : c.resources,
        gainers         : gainerPercent,
        losers          : c.losers  ? 100 - gainerPercent : 0
      };
    });
  }
  
  static getBackerDetail(data: any) {
    return {
      id: data.id,
      logo: data.logo,
      slug: data.slug,
      name: data.name,
      type: data.type,
      tier: data.tier,
      location: data.location,
      leadRounds: data.leadRounds,
      raised: data.raised,
      unicorns: data.unicorn,
      gainers: data.gainers,
      links: data.socials,
      introduction: data.description,
      totalInvesments: data.leadInvestments,
    };
  }
  static getFundingRound(datas: any) {
    return datas.map((c: any) => {
      return {
        _id: c._id,
        icon: c.icon,
        name: c.name,
        symbol: c.symbol,
        date: new Date(c.date),
        raise: c.raise,
        stage: c.stage,
        valuation: '',
        funds: c.funds.map((fund: any) => ({
          key: fund.key,
          tier: fund.tier,
          image: fund.image,
          type: fund.type,
          name: fund.name,
        })),
        category: c.category?.name,
      };
    });
  }
  static getPortfolio(datas: any) {
    return datas.map((c: any) => {
      const price = parseFloat(c.price) ?? 0;
      let histprices = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histprices = c.histPrices['24H']['USD'];
        }
      }
       
      return {
        id: c._id,
        key: c.key,
        logo: c.image,
        name: c.name,
        ticker: c.symbol,
        rating: null,
        price: price,
        price24hPercent: (price / histprices - 1) * 100,
        volume24h: c.volume24h,
        marketCap: c.marketCap,
      };
    });
  }

  static getProperties(unicorns: any, backerName: string) {
    let leadRounds;
    let raised;
    let unicorn;
    Object.keys(unicorns).forEach((key) => {
      if (unicorns[key]) {
        const properties = unicorns[key].value.properties;
        if (
          properties &&
          (JSON.stringify(properties)?.includes(backerName) ||
            (properties &&
              properties?.title?.[0]?.[0] &&
              JSON.stringify(properties.title[0][0])?.includes(backerName)))
        ) {
          // lead rounds
          if (
            properties?.[';OyB']?.[0]?.[0] !== undefined &&
            properties[';OyB'][0][0]
          ) {
            leadRounds = properties[';OyB'][0][0];
          }
          // unicorns
          if (
            properties?.['cV>J']?.[0]?.[0] !== undefined &&
            properties['cV>J'][0][0]
          ) {
            unicorn = properties['cV>J'][0][0];
          }
          // raised
          if (
            properties?.['@dbN']?.[0]?.[0] !== undefined &&
            properties['@dbN'][0][0]
          ) {
            raised = properties['@dbN'][0][0];
          }
        }
      }
    });
    return {
      leadRounds,
      raised,
      unicorns: unicorn,
    };
  }
}

export default BusinessBacker;
