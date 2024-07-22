import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { CmsBlockchainCtrl } from '../../controllers/admin-cms/blockchain/blockchain.ctrl';

export function getCmsBlockchainRouter(em: EntityManager) {
  const ctrl = new CmsBlockchainCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/blockchains',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/blockchains',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.create(ctx, next);
      },
      method: 'post',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/coin',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.findOne(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/blockchains',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.update(ctx, next);
      },
      method: 'put',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/blockchains',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.create(ctx, next);
      },
      method: 'delete',
    },
  ];
  return routers;
}
