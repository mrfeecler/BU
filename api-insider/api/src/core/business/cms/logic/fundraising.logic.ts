export class CmsBusinessFundraising {

  static getCoinFundraising(datas: any) {
    return datas.map((data: any) => {
      const lead_backer    = CmsBusinessFundraising.getLeadBacker(data);
      const normal_backers = CmsBusinessFundraising.getNormalBacker(data);
      return {
        type            : data.type,
        date            : data.date || null,
        raised          : parseFloat(data.raise),
        valuation       : data.valuation,
        lead_backer     : lead_backer,
        normal_backers  : normal_backers,
      };
    });
  }

  private static getLeadBacker(data: any){
    const lead = data.investors.find((item: any)=> item.type == "LEAD");
    return  lead;
  }

  private static getNormalBacker(data: any){
    const normals = data.investors.filter((item: any)=> item.type != "LEAD")
    return normals;
  }
}

export default CmsBusinessFundraising;
