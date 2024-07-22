import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Coin } from '../../core/schemas/home/coin';
import { BusinessCoinRule } from '../../core/business/block-ultra/rule/coin.rule';
import { AxiosService } from './axios.service';
import { UrlUtil } from '../../core/utils/url.util';
import { BusinessCompare } from '../../core/business/block-ultra/logic/compare.logic';

export class CoinService extends BaseService<Coin> {
  constructor(private readonly repo: Repository<Coin>) {
    super(repo);
  }

  async findByCoinKey(key: string): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ key });
    const result = await query.getOne();
    return result;
  }

  async findByCategory(categoryId: number): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ categoryId });
    query.orderBy('rank');
    const result = await query.getMany();
    return result;
  }

  async getCompare(coin_key: string, category: string): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ category });
    query.andWhere('key != :coin_key', { coin_key });
    query.orderBy('rank');
    query.select(BusinessCoinRule.SELECT_COMPARE);
    const datas = await query.limit(5).getRawMany();
    const result = BusinessCompare.getCoinDetail(datas);
    return result;
  }

  async getRankCoinInCategory(coin_key: string): Promise<any> {
    const query = this.repo.createQueryBuilder('c');
    query
      .leftJoinAndSelect('coins', 'subquery', 'subquery.key = :key', {
        key: coin_key,
      })
      .where('c.category = subquery.category')
      .orderBy('c.rank', 'ASC');
    query.select(['c.rank', 'c.key']);
    const result = await query.getRawMany();
    if (result.length > 0) {
      const rankOfCoin = result.find((x) => x.c_key == coin_key);
      return rankOfCoin.c_rank;
    } else {
      return 0;
    }
  }

  async updateCoinDetail(coin: any): Promise<any> {
    if (
      coin.links &&
      coin.description &&
      coin.histData &&
      coin.crowdsales &&
      coin.price &&
      coin.price != '0'
    ) {
      return coin;
    }

    const url = UrlUtil.getCoinDetail(coin.key);
    const response = await AxiosService.get(url);
    const coinDetail = response.data.data;
    let price = 0;
    if (coinDetail.price && 'USD' in coinDetail.price) {
      price = coinDetail.price['USD'];
    }
    const data = {
      ...coin,
      links: coinDetail.links,
      description: coinDetail.description,
      crowdsales: coinDetail.crowdsales,
      histData: coinDetail.histData,
      price: price,
      volume24h: coinDetail.volume24h,
      rank: coinDetail.rank,
      marketCap: coinDetail.marketCap,
      hasVesting: coinDetail.hasVesting,
      atlPrice: coinDetail.atlPrice,
      athPrice: coinDetail.athPrice,
      athMarketCap: coinDetail.athMarketCap,
      totalSupply: coinDetail.totalSupply,
    };
    await this.repo.update(coin._id, data);
    return {...coinDetail, price};
  }

  async createCoinDetail(coin_key: any): Promise<any> {
    const url = UrlUtil.getCoinDetail(coin_key);
    const response = await AxiosService.get(url);
    const coinDetail = response.data.data;
    let price = 0;
    if (coinDetail.price && 'USD' in coinDetail.price) {
      price = coinDetail.price['USD'];
    }
    const data = {
      key: coinDetail.key,
      name: coinDetail.name,
      rank: coinDetail.rank,
      hasFundingRounds: coinDetail.hasFundingRounds,
      links: coinDetail.links,
      symbol: coinDetail.symbol,
      type: coinDetail.type,
      rankHistory: coinDetail.rankHistory,
      lifeCycle: coinDetail.lifeCycle,
      maxSupply: coinDetail.maxSupply,
      unlimitedSupply: coinDetail.unlimitedSupply,
      totalSupply: coinDetail.totalSupply,
      percentOfCircSupply: coinDetail.percentOfCircSupply,
      initialSupply: coinDetail.initialSupply,
      initialMarketCap: coinDetail.initialMarketCap,
      image: coinDetail.image,
      tokens: coinDetail.tokens,
      categoryId: coinDetail.categoryId,
      category: coinDetail.category,
      tagIds: coinDetail.tagIds,
      tabs: coinDetail.tabs,
      interest: coinDetail.interest,
      isTraded: coinDetail.isTraded,
      marketDataNotAvailable: coinDetail.price ? false: true,
      vesting: coinDetail.vesting,
      hasVesting: coinDetail.hasVesting,
      listingDate: coinDetail.listingDate,
      athPrice: coinDetail.athPrice,
      icoData: coinDetail.icoData,
      icon: coinDetail.icon,
      fullyDilutedMarketCap: coinDetail.fullyDilutedMarketCap,
      availableSupply: coinDetail.availableSupply,
      marketCap: coinDetail.marketCap,
      volume24h: coinDetail.volume24h,
      noData: coinDetail.noData,
      volatility: coinDetail.volatility,
      price: price,
      histPrices: coinDetail.histPrices,
      atlPrice: coinDetail.atlPrice,
      fundIds: coinDetail.fundIds,
      chart: "",
      description: coinDetail.description,
      histData: coinDetail.histData,
      icoFullyDilutedMarketCap: coinDetail.icoFullyDilutedMarketCap,
      icoStatus: coinDetail.icoStatus,
      quote: coinDetail.quote,
      circulating_supply: coinDetail.circulating_supply,
      crowdsales: coinDetail.crowdsales,
      athMarketCap: coinDetail.athMarketCap,
    };
    await this.repo.save(data);
    return coinDetail;
  }
}
