export class BusinessFundraising {

  static getHomeFundraisingProps(datas: any) {
    return datas.map((c: any) => {
      return {
        name            : c.name,
        announceDate    : c.date ? new Date(c.date): null,
        raise           : parseFloat(c.raise),
        valuation       : "",
        funds           : c.funds,
        category        : {name: c.category?.name},
        slug            : c.key,
        icon            : c.icon,
        stage           : c.stage,
        symbol          : c.symbol
      };
    });
  }
}

export default BusinessFundraising;
