export class CmsBusinessPublicSale {
  static getPublicSaleProp(datas: any) {
    return datas.map((c: any) => {
      return {
        _id: c._id,
        launchpads: c.launchpads,
        start_date: c.start_date,
        end_date: c.till,
        price: c.price ? parseFloat(c.price) : 0,
        raise: c.raise ? parseFloat(c.raise) : 0,
        valuation: c?.valuation || "",
      };
    });
  }
}

export default CmsBusinessPublicSale;
