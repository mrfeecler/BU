import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { CmsLaunchpadCtrl } from '../../controllers/admin-cms/launchpad/launchpad.ctrl';

export function getCmsLaunchpadRouter(em: EntityManager) {
  const ctrl = new CmsLaunchpadCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/launchpads',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/launchpads',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.create(ctx, next);
      },
      method: 'post',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/launchpads',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.update(ctx, next);
      },
      method: 'put',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/launchpads',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.deletes(ctx, next);
      },
      method: 'delete',
    },
  ];
  return routers;
}
