 export class CmsBusinessLaunchpad {

  static getLaunchpadDetail(data: any, allocations: any, totalCoins: any, coin: any){
    return {
      
    }
  }
  static getLaunchpadList(datas: any) {
    return datas.map((item: any) => { 
      return {
        _id             : item._id,
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
        gainer          : item.gainers,
        loser           : item.losers,
      };
    });
  }
 
}

export default CmsBusinessLaunchpad;
