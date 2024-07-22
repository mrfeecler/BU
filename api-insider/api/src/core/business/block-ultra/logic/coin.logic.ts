import { DateUtil } from '../../../utils/date.util';

export class BusinessCoin {
  static getTokenomicChart(vesting: any) {
    let series: any = [];
    let { firstDate, lastDate } = DateUtil.getDateMaxMin(vesting);

    vesting.allocations.forEach((allocation: any) => {
      let times: any = [];
      let tokens: any = [];

      if (firstDate) {
        let fDate = new Date(firstDate);
        let lastToken = 0;
        while (fDate < lastDate) {
          times.push(new Date(fDate));
          let token = 0;

          allocation.batches.forEach((x: any) => {
            const batchDate = new Date(x.date);
            const formattedBatchDate = batchDate.toISOString().split('T')[0];
            const formattedFirstDate = fDate.toISOString().split('T')[0];
            if (formattedBatchDate == formattedFirstDate) {
              token = (x.unlock_percent * parseInt(allocation.tokens)) / 100;
            }
          });
          const totalToken = token + lastToken;
          tokens.push(totalToken);
          lastToken = totalToken;
          fDate.setDate(fDate.getDate() + 1);
        }
      }

      series.push({
        name: allocation.name,
        type: 'line',
        stack: 'Total',
        label: { show: false, position: 'top' },
        areaStyle: {},
        emphasis: { focus: 'series' },
        times: times,
        tokens: tokens,
      });
    });
    return series;
  }

  static calculatorAverage24h(datas: any){
    return datas.map((c: any) => {
      const price = c.price ? parseFloat(c.price) : 0;
      let histPrices = 0;
      if (c.histPrices && '24H' in c.histPrices) {
        if ('USD' in c.histPrices['24H']) {
          histPrices = c.histPrices['24H'].USD;
        }
      }
      const coin = { 
        key: c.key,  
        priceChangeIn24h:
          price && histPrices ? (price / histPrices - 1) * 100 : 0,
      };
      return coin;
    });
  }
  static getCoinInList(datas: any) {
    return datas.map((c: any) => {
      const price = c.price ? parseFloat(c.price) : 0;
      const priceChangeIn24h = c.priceChangeIn24h ? c.priceChangeIn24h : BusinessCoin.getPriceChangeIn24h(price, c.histPrices);
      const coin = {
        _id: c._id,
        key: c.key,
        icon: c.icon,
        name: c.name,
        image: c.image,
        symbol: c.symbol,
        price: price,
        rank: c.rank,
        category: c.category,
        average24h: priceChangeIn24h,
        volume24h: parseFloat(c.volume24h),
        marketCap: parseFloat(c.marketCap),
        atlPrice: c.atlPrice,
        chart: c.chart || null,
        priceChangeIn24h: priceChangeIn24h,
      };
      return coin;
    });
  }

  static getPriceChangeIn24h(price: number, histPrices: any){
    let histPrice = 0;
    if (histPrices && '24H' in histPrices) {
      if ('USD' in histPrices['24H']) {
        histPrice = histPrices['24H'].USD;
      }
    }
    const priceChangeIn24h = price && histPrice ? (price / histPrice - 1) * 100 : 0;
    return  priceChangeIn24h;
  }

  static getCoinDetail(
    c: any,
    rank_coin_in_wallet: any,
    idoPrice: any,
    backers: any,
  ): any {
    const price = c.price ? parseFloat(c.price) : 0;
    const totalSupply = c.totalSupply ? parseFloat(c.totalSupply): 0;
    const maxSupply = c.maxSupply ? parseFloat(c.maxSupply): 0;
    let histprices = 0;
    if (c.histPrices && '24H' in c.histPrices) {
      if ('USD' in c.histPrices['24H']) {
        histprices = c.histPrices['24H']['USD'];
      }
    }
    const athMarketCapPercent =c.marketCap && c.athMarketCap? parseFloat(c.marketCap) / c.athMarketCap.USD: 0;
    let fdv = c.fullyDilutedMarketCap;
    if(!c.fullyDilutedMarketCap){
      if(maxSupply){fdv = price * maxSupply; }
      else {fdv = totalSupply ? price * totalSupply: 0; }
    }
    const coin = {
      key: c.key,
      name: c.name,
      image: c.image,
      symbol: c.symbol,
      rank: c.rank,
      category: c.category,
      categoryId: c.categoryId,
      wallet: rank_coin_in_wallet,
      price: price,
      price_change_in_24h: c.price && histprices ? (price / histprices - 1) * 100 : 0,
      tokens: c?.tokens,
      listingDate: c?.listingDate,
      idoPrice: idoPrice?.price || null,
      idoPriceType: idoPrice?.type || null,
      icon: c.icon,
      initialMarketCap: c.initialMarketCap,
      initialSupply: c.initialSupply,
      atlPrice: c.atlPrice,
      athPrice: c.athPrice,
      marketCap: c.marketCap,
      volume24h: c.volume24h && price ? c.volume24h * price: 0,
      volMCap24h: c.volume24h && c.marketCap ? c.volume24h / c.marketCap : 0,
      fdv: fdv,
      histPrices: c.histPrices,
      percentOfCircSupply: c.percentOfCircSupply,
      circ: c.totalSupply && c.percentOfCircSupply ? c.totalSupply * (c.percentOfCircSupply / 100): 0,
      totalSupply: totalSupply ? c.totalSupply.toString(): "",
      backers: backers,
      rate: '5.0',
      links: c.links,
      tagIds: c.tagIds,
      description: c.description,
      histData: c.histData,
      athMarketCap: c.athMarketCap
        ? {
            ...c.athMarketCap,
            percent: athMarketCapPercent,
          } : null,
      hasFundingRounds: c.hasFundingRounds,
      marketDataNotAvailable: c.price ? false : true,
      crowdsales: c.crowdsales,
      maxSupply: c.maxSupply,
      marketCapChangeIn24h: c.marketCap,
      vol24hChangeIn24h: c.volume24h,
      publicPriceType: 0,
      publicPricePrice:0,
      publicPriceROI: 0,
      earlyStagePriceRound: 0,
      earlyStagePricePrice: 0,
      earlyStagePriceROI: 0,
      idoPriceRoi: 0
    };
    return coin;
  }

  static getMarketSpot(datas: any) {
    return datas.map((c: any) => {
      const coin = {
        _id: c._id,
        key: c.coinkey,
        icon: c.exchangeIcon,
        name: c.exchangeName,
        image: c.image,
        tier: 1,
        pair: c.symbol,
        price: c.usdLast,
        volume24h: c.usdVolume,
        exchangeGroup: c.exchangeGroup,
        marketShare: c.exchangePercentVolume,
      };
      return coin;
    });
  }

  static getCoinFundraising(datas: any, coin: any) {
    let backerLeadCount = 0;
    let pricePerRoundName: any = [];
    let pricePerRoundPrice: any = []
    const slugSet = new Set();
    const fundraisings = datas.map((c: any) => {
      const totalSupply = coin.totalSupply ? parseFloat(coin.totalSupply) : 0;
      const coinPrice = coin.price ? parseFloat(coin.price) : null;
      const coinAthPrice = coin.athPrice['USD'];
      const price = c.valuation ? (c.valuation / totalSupply) * 100 : null;
      const tokensOffered = price ? c.raise / price : null; 

      const fundraising = {
        type: c.type,
        date: c.date,
        linkToAnnouncement: c.linkToAnnouncement,
        price: price,
        valuation: c.valuation,
        raised: c.raise,
        tokensOffered: price ? c.raise / price : null,
        percenOfTokens: tokensOffered && totalSupply ? (tokensOffered / totalSupply) * 100 : null,
        roi: price && coinPrice ? coinPrice / price : null,
        athROI: price && coinAthPrice ? coinAthPrice / price : null,
        unlockedPercent: null,
        unlockedTokens: null,
        unlockedValue: null,
        backersCount: 0,
      };

      let backers: any = [];
    
      c.investors.forEach((element: any) => {
        backerLeadCount += element.type == 'LEAD' ? 1 : 0;
        if (!slugSet.has(element.slug)) {
          backers.push({
            logo: element.logo,
            type: element.type,
            name: element.name,
            tier: element.tier,
          });
          slugSet.add(element.slug);
        }
      });

      fundraising.backersCount = backers.length;
      const result = { ...fundraising, backers: backers };
      return result;
    });

    const overview = BusinessCoin.getOverviewFundraising(fundraisings, backerLeadCount, pricePerRoundName, pricePerRoundPrice, coin.totalSupply);
    return { overview, fundraisings };
  }

  static getOverviewFundraising(fundraisings: any, backerLeadCount: number, pricePerRoundName: any, pricePerRoundPrice: any, totalSupply: string){
    const overview: any = {
      totalFundRaised: 0,
      avgPrice: 0,
      rounds: 0,
      leadBackers: backerLeadCount,
      pricePerRoundName: pricePerRoundName,
      pricePerRoundPrice: pricePerRoundPrice,
      strategic: '',
      stage: '',
      pre_seed: '',
      round_number: 3,
      backers_count: 0,
      backers: [],
    };

    let totalPrice = 0;
    const totalSup = totalSupply ? parseFloat(totalSupply) : 0; 
    const slugSet = new Set();
    for (let index = 0; index < fundraisings.length; index++) {
      const f = fundraisings[index];
      const price = f.price ? f.valuation ? (f.valuation / totalSup) * 100 : 0: 0;

      totalPrice += price || 0;
      if(f.raise || f.raised){
        overview.totalFundRaised += parseFloat(f.raise) || parseFloat(f.raised);
      }
      overview.stage = f.type;
      pricePerRoundName.push(f.type);
      pricePerRoundPrice.push(price);
      const backerList = f.backers ? f.backers.sort((a: any, b: any) => {
        if (a.type === "LEAD" && b.type !== "LEAD") {
          return -1;
        } else if (a.type !== "LEAD" && b.type === "LEAD") {
          return 1;
        } else {
          return 0;
        }
      }): null;
      if(backerList){
        backerList.forEach((b: any) => {
          if (overview.backers.length < 6) {
            overview.backers.push(b);
          }
        });
      }
    }

    let backerList: any = [];
    if(fundraisings.length > 0){
       fundraisings.forEach((f: any) => {
          if(f.investors){
            f.investors.forEach((backer: any) => {
              backerList.push(backer);
            });
          }

          if(f.backers){
            f.backers.forEach((backer: any) => {
              backerList.push(backer);
            });
          }
       });
    }
   
    const investors: any = [];
    if(backerList){
      backerList.forEach((b: any) => {
        if (!slugSet.has(b.name)) {
          investors.push(b);
          slugSet.add(b.name);
        }
      });
    }

    fundraisings.sort(function(a: any, b: any) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    overview.backers_count = investors.length;
    overview.avgPrice = totalPrice / fundraisings.length;
    return {...overview, totalBackers: investors};
  }

  static getCoinIeoIdo(datas: any, coin: any) {
    const ieoidos: any = [];
    const totalSupply = parseFloat(coin.totalSupply);
    const coinPrice = parseFloat(coin.price);
    const coinAthPrice = coin.athPrice?.USD;

    datas.forEach((e: any) => {
      ieoidos.push({
        key: e.idoPlatformKey,
        logo: e.iitilp_icon,
        name: e.iitilp_name,
        type: e.type,
        time_start: e.start,
        time_end: e.end,
        time_link: null,
        price: e.price,
        valuation: coinPrice && totalSupply ? coinPrice * totalSupply : 0,
        raised: e.raise.USD,
        tokensOffered: e.tokensForSale ? parseFloat(e.tokensForSale) : 0,
        percenOfTokens:
          e.tokensForSale && totalSupply
            ? (parseFloat(e.tokensForSale) / totalSupply) * 100
            : 0,
        roi: coinPrice && e.price ? coinPrice / e.price : 0,
        athROI: coinAthPrice && e.price ? coinAthPrice / e.price : 0,
        unlockedPercent: 'null',
        unlockedTokens: 'null',
        unlockedValue: 'null',
      });
    });

    const overview: any = {
      totalRaise: 0,
      avgPrice: 0,
      totalTokensOffered: 0,
      percentOfToken: 0,
      backer_count: 0,
      backers: [],
    };

    let totalPrice = 0;
    ieoidos.forEach((item: any) => {
      totalPrice += item.price;
      overview.totalRaise += parseFloat(item.raised);
      overview.totalTokensOffered += parseFloat(item.tokensOffered);
    });

    overview.percentOfToken = coin.totalSupply * 100;
    overview.avgPrice = totalPrice / ieoidos.length;
    overview.backer_count = datas.length;
    const response = {
      overview: overview,
      ieoidos: ieoidos,
    };
    return response;
  }
}

export default BusinessCoin;
