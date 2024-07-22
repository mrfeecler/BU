import { Entity, Column } from 'typeorm';
import { BaseSchema } from './core/base';

@Entity({ name: 'categories' })
export class Category extends BaseSchema {
  @Column()
  id: number = 0;

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true })
  type: string = '';

  @Column({ nullable: true, unique: true })
  slug: string = '';

  @Column({ nullable: true })
  ruName: string = '';

  @Column({ nullable: true })
  isIcoList: boolean = false;

  @Column({ nullable: true, type: 'json' })
  avgPriceChange: string = '';

  @Column({ nullable: true })
  gainers: number = 0;

  @Column({ nullable: true })
  losers: number = 0;

  @Column({ nullable: true })
  gainer7d: number = 0;

  @Column({ nullable: true })
  loser7d: number = 0;

  @Column({ nullable: true })
  gainer1m: number = 0;

  @Column({ nullable: true })
  loser1m: number = 0;

  @Column({ nullable: true, type: 'json' })
  rankedCoins: string = '';

  @Column({ nullable: true, type: 'float' })
  market_cap: number = 0;

  @Column({ nullable: true, type: 'float' })
  volume24h: number = 0;

  @Column({ nullable: true, type: 'json' })
  yesterday: string = '';

  @Column({ nullable: true, type: 'float' })
  dominance: number = 0;
}
