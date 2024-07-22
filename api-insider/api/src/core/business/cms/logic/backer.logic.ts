export class CmsBusinessBacker {
  static getBackers(datas: any){
    return datas.map((c: any) => {
      return {
        _id             : c._id,
        logo            : c.logo,
        email           : c.email,
        name            : c.name,
        tier            : c.tier,
        type            : c.type,
        company         : c.company,
        location        : c.location,
        position        : c.position
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
      unicorns: data.unicorns,
      gainers: data.gainers,
      links: data.socials,
      introduction: data.description,
      totalInvesments: data.leadInvestments,
    };
  }
    
}

export default CmsBusinessBacker;
