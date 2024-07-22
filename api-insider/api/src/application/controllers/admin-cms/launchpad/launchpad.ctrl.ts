import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import CrudLaunchpadFlow from '../../../../usecase/admin-cms/launchpad/crud_launchpad.flow';
import { IeoIdoTopIdoLaunchPad } from '../../../../core/schemas/ieo-ido/ieo-ido-top-ido-launch-pad';
import { IeoIdoTopIdoLaunchPadService } from '../../../../infrastructure/services/ieo-ido-top-ido-launch-pad.service';

export class CmsLaunchpadCtrl {
  private readonly flow: CrudLaunchpadFlow;
  constructor(private readonly em: EntityManager) {
    const service = new IeoIdoTopIdoLaunchPadService(this.em.getRepository(IeoIdoTopIdoLaunchPad));
    this.flow = new CrudLaunchpadFlow(service);
  }
  
  async findOne(ctx: Koa.Context, _next: Koa.Next) {
    let { id } = ctx.query;
    const res = await this.flow.findOne(id as string);
    ctx.body = res;
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key, sort_by, sort_order, limit, page } = ctx.query;
    const res = await this.flow.list(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.body = res;
  }

  async create(ctx: Koa.Context, _next: Koa.Next) {
    const { id } = ctx.query;
    const res = await this.flow.create(id as string);
    ctx.body = res;
  }

  async update(ctx: Koa.Context, _next: Koa.Next) {
    const { id } = ctx.query;
    const res = await this.flow.update(id as string);
    ctx.body = res;
  }
  
  async deletes(ctx: Koa.Context, _next: Koa.Next) {
    const { ids } = ctx.query;
    const res = await this.flow.deletes(ids as string);
    ctx.body = res;
  }
}
