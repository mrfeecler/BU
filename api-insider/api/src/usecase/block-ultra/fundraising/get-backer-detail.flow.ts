import BusinessBacker from '../../../core/business/block-ultra/logic/backer.logic';
import { IBackerService } from '../../../core/interfaces/backer';

export class GetBackerDetailFlow {
  constructor(private readonly service: IBackerService) {}

  async execute(value: string) {
    const query = await this.service.getQueryBuilder();
    if (/^\d+$/.test(value)) {
      const integerValue = parseInt(value, 10);
      query.where({ id: integerValue });
    } else {
      query.where({ slug: value });
    }

    let backer = await query.getOne();
    if ((!backer.leadInvestments || backer.leadInvestments === 0) && (/^\d+$/.test(value))) {
      const crawLeadInvestments = await this.service.crawLeadInvestments(value);
      backer.leadInvestments = crawLeadInvestments
      await this.service.update(backer);
    }
    if (!backer.socials) {
      const socials = await this.service.getSocials(backer.slug);
      if (socials) {
        backer.socials = socials.links;
        backer.description = socials.description;
        await this.service.update(backer);
      } else {
        const crawSocials = await this.service.crawlSocials(backer.slug);
        if(crawSocials.socials.length > 0 || crawSocials.description !== '') {
          backer.socials = crawSocials.socials;
          backer.description = crawSocials.description;
          await this.service.update(backer);
        }
      }
    }
    if (!backer.unicorn || !backer.raised) {
      const unicorns = await this.service.getUnicorns();
      if (Object.keys(unicorns).length !== 0) {
        const props = BusinessBacker.getProperties(unicorns, backer.name);
        backer = {...backer, leadRounds: props.leadRounds, raised: props.raised, unicorn: props.unicorns};
        if(props.leadRounds || props.raised || props.unicorns){
          await this.service.update(backer);
        }
      }
    }
    const result = BusinessBacker.getBackerDetail(backer);
    return result;
  }
}

export default GetBackerDetailFlow;
