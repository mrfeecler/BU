import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'marquee' })
export class Marquee extends BaseSchema {
  @Column({ nullable: true, type: 'numeric' })
  allCurrencies: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  btcDominanceChangePercent: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  totalVolume24h: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  totalMarketCapChangePercent: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  totalVolume24hChangePercent: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  btcDominance: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  totalMarketCap: number = 0;

  @Column({ nullable: true, type: 'json' })
  gas: string = '';

  @Column({ nullable: true, type: 'json' })
  fear_greed: string  = "";

  @Column({ nullable: true, type: 'numeric' })
  btc_realized_price: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  btc_mvrv: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  btc_long: number = 0;
}
