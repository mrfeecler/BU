export class CmsBusinessCoin {

  static getCoinList(coins: any){
    return coins.map((c: any)=> {
      let image = "";
      if (c.image && 'x60' in c.image) {
        image = c.image['x60'];
      }
      return {
        _id: c._id,
        key: c.key,
        name: c.name ? c.name: c.key,
        symbol: c.symbol,
        ticker: "",
        stage: "",
        created_by: "",
        updated_by: "",
        icon: image
      }
    })
  }

  static getCoinDetail(c: any, funding_rounds: any, vesting: any, markets: any, public_sales: any, socials: any, teams: any, advisors: any, partners: any): any {
    const general     = CmsBusinessCoin.getCoinGeneral(c);
    const overview    = CmsBusinessCoin.getOverview(c);
    const profile     = CmsBusinessCoin.getProfile(c, teams, advisors, partners); 
    const tokenomic   = CmsBusinessCoin.getTokenomic(vesting); 
    const coin = {
      _id: c._id,
      key: c.key,
      links: c.links,
      general, overview, profile, tokenomic, 
      funding_rounds, public_sales, markets
    };
    return coin;
  }

  private static getCoinGeneral(c: any): any {
    return {
      logo: c.image["x60"],
      name: c.name,
      stage: '',
      ticker: '',
      created_by: '',
      updated_at: c.updated_at,
    };
  }

  private static getOverview(c: any): any {
    return {
      category: c.category,
      sub_category: '',
      resource: '',
      contracts: '',
      description: c.description || "",
    };
  }

  private static getProfile(c: any, _teams: any, _advisors: any, _partners: any): any {
    const teams    = CmsBusinessCoin.getTeam(_teams);
    const advisors = CmsBusinessCoin.getAdvisor(_advisors);
    const partners = CmsBusinessCoin.getPartner(_partners);
    return { 
      introduction: "",
      uniqueSellingProposition: "",
      employee: "",
      address: "",
      foundedDate: "",
      teams,
      advisors,
      partners
    };
  }

  private static getTeam(_teams: any){
    return _teams.map((item: any) => {
      return {
        id: "",
        name: "",
        position: "",
        socials: ""
      }
    })
  }

  private static getAdvisor( _advisors: any){
    return _advisors.map((item: any) => {
      return {
        id: "",
        name: "",
        position: "",
        socials: ""
      }
    })
  }

  private static getPartner(_partners: any){
    return _partners.map((item: any) => {
      return {
        id: 0,
        name: "",
        type: ""
      }
    })
  } 

  private static getTokenomic(vesting: any): any {
    if(!vesting) return null;
    const allocations = CmsBusinessCoin.getAllocation(vesting);
    return {
      total_supply: "",
      initital_circ_supply: "",
      inflation: "",
      token_use_case: "",
      max_supply: "",
      burn: "",
      allocations
    };
  }

  private static getAllocation(vesting: any){
    return vesting.allocations.map((item: any) => {
      return {
        round: item.name,
        name : item.name,
        unlock_type: item.unlock_type,
        tge_unlock: "",
        unlock_schedule: ""
      }
    })
  }

  static getMarket(markets: any): any {
    return markets.map((item: any) => {
      return {
        id: item._id,
        exchange: item.exchangeName
      }
    })
  }

 
}

export default CmsBusinessCoin;
