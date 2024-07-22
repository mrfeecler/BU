import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { CoinFundraising } from '../../core/schemas/coin-detail/fundraising/coin-fundraising';
import { UrlUtil } from '../../core/utils/url.util';
import { AxiosService } from './axios.service';

export class CoinFundraisingService extends BaseService<CoinFundraising> { 
  constructor(private readonly repo: Repository<CoinFundraising>) {
    super(repo); 
  }

  async getCountByKey(key: string): Promise<any> {
    const query = this.repo.createQueryBuilder();
    query.where({ coin_key: key });
    const total =  await query.getCount();
    if (total == 0) {
      const url = UrlUtil.getFundingRound(key);
      const response = await AxiosService.get(url);
      if (response.data.length == 0) {
        return 0;
      }
      let datas = response.data;
      datas = datas.map((x: any) => {
        x.coin_key = key;
        return x;
      });
      this.repo.insert(datas);
      return datas.length;
    }
    return total;
  } 
  
  async getByCoinKey(coin_key: string): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ coin_key });
    const datas = await query.getMany();  
    return datas;
  }
}
