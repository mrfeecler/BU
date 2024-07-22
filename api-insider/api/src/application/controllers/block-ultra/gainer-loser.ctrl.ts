import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import GetGainersListFlow   from '../../../usecase/block-ultra/home/get-list-gainer.flow';
import GetLoserListFlow     from '../../../usecase/block-ultra/home/get-list-loser.flow';
 
import { CoinService } from '../../../infrastructure/services/coin.service';
import { Coin } from '../../../core/schemas/home/coin';

export class GainerLoserCtrl {
  private getGainerListFlow;
  private getLoserListFlow;

  constructor(private readonly em: EntityManager) {
    const coinService = new CoinService(this.em.getRepository(Coin));

    this.getGainerListFlow = new GetGainersListFlow(coinService);
    this.getLoserListFlow  = new GetLoserListFlow(coinService);
  }

  async getListGainer(ctx: Koa.Context, _next: Koa.Next) {
    const { coin } = ctx.query;
    const limit = coin == "all" ? 0: coin;
    const datas = await this.getGainerListFlow.execute(
      parseInt(limit as string)
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async getListLoser(ctx: Koa.Context, _next: Koa.Next) {
    const { coin } = ctx.query;
    const limit = coin == "all" ? 0: coin;
    const datas = await this.getLoserListFlow.execute(
      parseInt(limit as string)
    );
    ctx.status = 200;
    ctx.body = datas;
  }
}
