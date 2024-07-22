import { DateUtil } from "../../../utils/date.util";

export class BusinessCategoryVolume {
  static calculatorVolume(categoryVolumes: any, time: string){ 

    const marketCap       = BusinessCategoryVolume.getMarketCap(categoryVolumes);
    const marketCapChange = marketCap ? BusinessCategoryVolume.getMarketCapChange(categoryVolumes, time): null;
    const volumeChange    = BusinessCategoryVolume.getVolumeChange(categoryVolumes, time);
    const dataChart       = BusinessCategoryVolume.getDataChart(categoryVolumes, time);
    const volume          = BusinessCategoryVolume.getVolume(categoryVolumes, time);

    return {
      marketCap,
      marketCapChange,
      volume,
      volumeChange,
      dataChart,
    };
  } 

  static getMarketCap(categoryVolumes: any){
    const lastMarketCap = categoryVolumes[categoryVolumes.length - 1].marketCap || categoryVolumes[categoryVolumes.length - 2].marketCap; 
    return lastMarketCap;
  }

  static getMarketCapChange(categoryVolumes: any, time: string): any {
    const lastMarketCap      = categoryVolumes[categoryVolumes.length - 1].marketCap || categoryVolumes[categoryVolumes.length - 2].marketCap; 
    let   index              = categoryVolumes.length - 24;

    switch (time) { 
      case "7d":
        index               =  categoryVolumes.length - (7 * 24);
        break;
      case "1m":
        const getDayInMonth = DateUtil.getDayInPrevMonth();
        index               = categoryVolumes.length - (getDayInMonth - 1) * 24;
        break;
    }

    let calculateConst = categoryVolumes[index]; 
    if (calculateConst && Object.keys(calculateConst).includes('marketCap')) {
      const value = (parseFloat(lastMarketCap) /  parseFloat(calculateConst.marketCap) - 1) * 100;
      return value;
    }else {
      return 0;
    }
  }

  static getVolume(categoryVolumes: any, time: string){
    const lastVolume24h  = categoryVolumes[categoryVolumes.length - 2].volume24h;
    switch (time) { 
      case "7d": 
        let totalVolume = 0;
        for (let index = 0; index < 7; index++) {
          const categoryVolume = categoryVolumes[categoryVolumes.length - (index * 24)];
          const volume = categoryVolume ? categoryVolume.volume24h: lastVolume24h;
           totalVolume += parseFloat(volume);
        }
        return totalVolume;
      case "1m":
        let totalVolume1m = 0;
        for (let index = 0; index < 31; index++) {
          const categoryVolume = categoryVolumes[categoryVolumes.length - (index * 24)];
          const volume = categoryVolume ? categoryVolume.volume24h: lastVolume24h;
          totalVolume1m += parseFloat(volume);
        }
        return totalVolume1m;
      default:
        const volume = categoryVolumes[categoryVolumes.length - 1].volume24h || categoryVolumes[categoryVolumes.length - 2].volume24h;
        return volume;
    } 
  }

  static getVolumeChange(categoryVolumes: any, time: string) {
    let volumnLastConst = categoryVolumes.length == 753 ? categoryVolumes[categoryVolumes.length - 2]: categoryVolumes[categoryVolumes.length - 2];
    let index           = categoryVolumes.length - 24;
    switch (time) { 
      case "7d": 
        index   =  categoryVolumes.length - 7 * 24;
        break;
      case "1m":
        const getDayInMonth = DateUtil.getDayInPrevMonth();
        index   = categoryVolumes.length - (getDayInMonth - 1) * 24;
        break;
    }
    const volumn24Const =  categoryVolumes[index]; 
    if (volumn24Const && volumnLastConst && Object.keys(volumnLastConst).includes('volume24h')) {
      const lastVolume24h = (parseFloat(volumnLastConst.volume24h));
      const volumeChange = (lastVolume24h / volumn24Const.volume24h - 1)  * 100;
      return volumeChange;
    } else {
      return 0;
    }
  }

  static getDataChart(categoryVolumes: any, time: string) {
    const volumes = [];
    const marketCaps = [];
    const times = [];
    let index = categoryVolumes.length - 23;
    const getDayInMonth = DateUtil.getDayInPrevMonth();
    switch (time) {
      case "7d":
        index = categoryVolumes.length - (6 * 24 - 23);
        break; 
      case "1m": 
        index = categoryVolumes.length - (getDayInMonth - 1) * 24 - 23;
        break;
    }
    for (let i = index;i < categoryVolumes.length;i++) {
      const categoryVolume = categoryVolumes[i];
      try {volumes.push(parseFloat(categoryVolume.volume24h));} catch (error) {volumes.push(0);}
      try {marketCaps.push(parseFloat(categoryVolume.marketCap));} catch (error) {marketCaps.push(0);}
      try {times.push(parseFloat(categoryVolume.time));} catch (error) {times.push(0);}
    }

    return {
      volumes: volumes,
      times: times,
      marketCaps: marketCaps,
    };
  }
}

export default BusinessCategoryVolume;
