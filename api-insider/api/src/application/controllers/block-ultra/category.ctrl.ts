import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { Category }         from '../../../core/schemas/category';
import { Coin }             from '../../../core/schemas/home/coin';
import { CategoryVolumn }   from '../../../core/schemas/common/category-volume';

import { CategoryService }        from '../../../infrastructure/services/category.service';
import { CoinService }            from '../../../infrastructure/services/coin.service';
import { CategoryVolumnService }  from '../../../infrastructure/services/category-volumn.service';

import GetCategoryListFlow          from '../../../usecase/block-ultra/category/get-list-category.flow';
import GetCategoryFlow              from '../../../usecase/block-ultra/category/get-category.flow';
import GetCoinByCategoryFlow        from '../../../usecase/block-ultra/coin/get-coin-by-category.flow';
import GetCategoryVolumeFlow        from '../../../usecase/block-ultra/category-volume/get-category-volume.flow';
import SearchCategoryFlow     from '../../../usecase/block-ultra/category/search-category.flow';

import BusinessGainerLoser  from '../../../core/business/block-ultra/logic/gainer-loser.logic';
import SearchCategoryCoinFlow from '../../../usecase/block-ultra/category/search-category-coins.flow';


export class CategoryCtrl {
  private getCategoriesFlow;
  private getCategoryFlow;
  private getCoinByCategoryFlow;
  private getCategoryVolumeFlow;
  private searchCategoryFlow;
  private categoryService;
  private searchCategoryCoinFlow;
  constructor(private readonly em: EntityManager) {
    this.categoryService        = new CategoryService(this.em.getRepository(Category));
    const coinService           = new CoinService(this.em.getRepository(Coin));
    const categoryVolumnService = new CategoryVolumnService(this.em.getRepository(CategoryVolumn));

    this.getCategoriesFlow        = new GetCategoryListFlow(this.categoryService);
    this.getCategoryFlow          = new GetCategoryFlow(this.categoryService);
    this.getCoinByCategoryFlow    = new GetCoinByCategoryFlow(coinService);
    this.getCategoryVolumeFlow    = new GetCategoryVolumeFlow(categoryVolumnService);
    this.searchCategoryFlow       = new SearchCategoryFlow(this.categoryService);
    this.searchCategoryCoinFlow   = new SearchCategoryCoinFlow(coinService); 
  }
 
  async listAll(ctx: Koa.Context, _next: Koa.Next) {
    const query = await this.categoryService.getQueryBuilder("c");
    // query.leftJoin('category_volumns', 'cv', 'c.id = cv.category_id');
    // query.where('cv.category_id IS NULL');
    query.where("c.type = 'sub'");
    query.andWhere("c.gainer1m IS NULL");
    query.select(["id", "type", "slug"]);
    const datas = await query.getRawMany();
    ctx.status = 200;
    ctx.body = datas;
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { sort_by, sort_order, limit, page, search_key } = ctx.query;
    sort_by = sort_by ? sort_by : 'market_cap';
    sort_order = sort_order ? sort_order : 'asc';
    const datas = await this.getCategoriesFlow.execute(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async findOne(ctx: Koa.Context, _next: Koa.Next) {
    const { id, time } = ctx.query;
    const category       = await this.getCategoryFlow.execute(id as string);
    const categoryVolumn = await this.getCategoryVolumeFlow.execute(category.id, time as string );
    
    const gainerPercent  = BusinessGainerLoser.getGainerPercent(category, time as string);
    const loserPercent   = BusinessGainerLoser.getLoserPercent(category, time as string);
    let gainer = category.gainers;
    let loser  = category.losers;
    switch (time) {
      case "7d":
        gainer = category.gainer7d;
        loser  = category.loser7d;
        break;
      case "1m":
        gainer = category.gainer1m;
        loser  = category.loser1m;
        break;
     }
    const newCategory = {
      _id: category._id,
      id: category.id,
      slug: category.slug,
      name: category.name,
      gainers: gainer,
      losers: loser, 
      market_cap: category.market_cap,
      volume24h: category.volume24h,
    }
    const result = { ...newCategory, gainerPercent, loserPercent, categoryVolumn };
    ctx.status = 200;
    ctx.body = result;
  }

  async getCoinList(ctx: Koa.Context, _next: Koa.Next) {
    let { category_id, search_key, sort_by, sort_order, limit, page } = ctx.query;
    sort_order = sort_order ? sort_order : 'desc';
    sort_by = sort_by ? sort_by : 'marketCap'; 
    const coins = await this.getCoinByCategoryFlow.execute(
      parseInt(category_id as string),
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string),
      parseInt(page as string),
    );
    ctx.status = 200;
    ctx.body = coins;
  }

  async searchCategory(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const datas = await this.searchCategoryFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async searchCategoryCoin(ctx: Koa.Context, _next: Koa.Next) {
    let { category_id, search_key } = ctx.query;
    const datas = await this.searchCategoryCoinFlow.execute(search_key as string, parseInt(category_id as string));
    ctx.status = 200;
    ctx.body = datas;
  }
}
