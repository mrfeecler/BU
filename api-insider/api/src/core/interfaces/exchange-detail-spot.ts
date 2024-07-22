import { IBaseService } from './core/base';
import { ExchangeDetailSpot } from '../../core/schemas/exchange/exchange-detail-spot';

export interface IExchangeDetailSpotService extends IBaseService<ExchangeDetailSpot> {
  getExchangeDetailSpot(ket: string): Promise<any>;
  getByCoinKey(coin_key: string): Promise<any>;
}
