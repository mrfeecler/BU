import { IBaseService } from './core/base';
import { CoinFundraising } from '../schemas/coin-detail/fundraising/coin-fundraising';

export interface ICoinFundraisingService extends IBaseService<CoinFundraising> {
  getByCoinKey(coin_key: string): Promise<any>;
}
