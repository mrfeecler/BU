import { CommonUtil } from "../../../../core/utils/common.util";

export class BusinessIeoIdo {
  static getLaunchPadDetailProjectUpcoming(datas: any) {
    let result: any = [];
    datas.forEach((item: any) => {
      const isHot = item.totalRaise > 20000000 && item.funds.includes(1);
      result.push({
        key             : item.key, 
        project         : item.name,
        initialCap      : item.initialCap ? parseFloat(item.initialCap): 0,
        totalRaise      : item.totalRaise,
        backers         : item.funds,
        category        : item.category,
        launchpads      : item.launchpads,
        start_date      : item.start_date,
        image           : item.image,
        symbol          : item.symbol,
        isHot           : isHot,
      });
    });
    return result;
  }

  static getLaunchPadDetailProjectEnded(datas: any) {
    let result: any = []; 
    datas.forEach((item: any) => { 
      result.push({
        key             : item.key,
        project         : item.name,
        icon            : item.image,
        symbol          : item.symbol,
        currentPrice    : item.price  ? parseFloat(item.price): 0,
        totalRaised     : item.raise  ? parseFloat(item.raise): 0,
        roi             : item.roi    ? parseFloat(item.roi): 0,
        athRoi          : item.athRoi ? parseFloat(item.athRoi): 0, 
        launchpads      : item.launchpads,
        endDate         : item.start_date
      });
    });
    return result;
  }

  static getIeoIdoUpcoming(datas: any) {
    let result: any = [];
    datas.forEach((item: any) => {
      const fundIds = item.funds.map((f: any) => f.tier); 
      const totalRaised = item.fundraisings.reduce((accumulator: any, currentValue: any) => {
        return currentValue.raised ? accumulator + currentValue.raised: 0;
    }, 0);

    const isHot = totalRaised > 20000000 && fundIds.includes(1);

      result.push({
        project       : item.name,
        image         : item.image,
        symbol        : item.symbol,
        key           : item.key,
        initialCap    : item.initialCap,
        totalRaise    : item.totalRaise,
        backers       : item.funds,
        category_name : item.category_name,
        launchpads    : item.launchpads,
        start_date    : item.start_date,
        end_date      : item.till,
        isHot         : isHot,
        price         : item.price,
        roi           : item.roi,
        auth_roi      : item.athRoi,
        updated_at    : item.updated_at,
      });
    });
    return result;
  }

  static getTopIdoLaunchPad(datas: any) {
    return datas.map((item: any) => {
      return {
        ido_platform_id : item.id,
        key             : item.key,
        name            : item.name,
        tier            : 1,
        icon            : item.icon,
        image           : item.image,
        roi             : parseFloat(item.avg_roi_current),
        athRoi          : parseFloat(item.avg_roi_ath),
        idos            : item.projectsCount,
        entry           : item.enterPrice,
        sumMarketCap    : item.marketCap,
        gainer          : item.gainers || item.losers ? item.gainers / (item.gainers + item.losers) * 100: 0,
        loser           : item.gainers || item.losers ? 100 - (item.gainers / (item.gainers + item.losers) * 100): 0,
      };
    });
  }

  static getLaunchPadDetail(l: any, idoVolume: any, time: string): any {
    if(!l){
      return null;
    }
    const links = l.links ? CommonUtil.filterUniqueTypes(l.links): [];
    let histprices = 0;
    if (l.histPrices && '24H' in l.histPrices) {
      if ('USD' in l.histPrices['24H']) {
        histprices = l.histPrices['24H']['USD'];
      }
    }
    let gainer = l.gainers;
    let loser  = l.losers;
    switch (time) {
      case "7d":
        gainer = l.gainer7d;
        loser  = l.loser7d;
        break;
      case "1m":
        gainer = l.gainer1m;
        loser  = l.loser1m;
        break;
     }

    const launchPad = {
      name                    : l.name,
      foundationDate          : l.foundationDate,
      tokenPlatforms          : l.tokenPlatforms,
      nativeToken             : l.nativeToken,
      enterPrice              : l.price,
      price                   : l.price,
      histPrices              : l.histprices,
      priceChangeIn24h        : l.price && histprices ? (l.price / histprices - 1) * 100 : null,
      links                   : links,
      totalFundsRaised        : l.totalFundsRaised,
      avgRoi                  : l.avgRoi,
      projectsCount           : l.projectsCount,
      avgRoiAth               : l.avgRoi ? l.avgRoi.ath: null,
      categoriesDistribution  : l.categoriesDistribution,
      gainers                 : gainer || l.gainers,
      losers                  : loser || l.losers,
      marketCap               : l.marketCap,
      volume24h               : l.volume24h,
      marketCapChange         : idoVolume ? idoVolume.marketCapChange: null,
      volume                  : idoVolume ? idoVolume.volume: null,
      volumeChange            : idoVolume ? idoVolume.volumeChange: null,
      dataChart               : idoVolume ? idoVolume.dataChart: null,
      icon                    : l.icon,
      image                   : l.image
    };
    return launchPad;
  }
}

export default BusinessIeoIdo;
