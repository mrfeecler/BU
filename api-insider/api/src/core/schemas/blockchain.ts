import { Entity, Column } from 'typeorm';
import { BaseSchema } from './core/base';

@Entity({ name: 'blockchains' })
export class BlockChain extends BaseSchema {
  @Column({ unique: true })
  id: number = 0;

  @Column({ nullable: true, type: 'json' })
  avgPriceChange: string = '';

  @Column({ nullable: true, type: 'float' })
  dominance: number = 0;
  
  @Column({ nullable: true })
  explorerUrl: string = '';

  @Column({ nullable: true })
  gainers: number = 0;

  @Column({ nullable: true })
  images: string = ""; 

  @Column({ nullable: true })
  losers: number = 0;

  @Column({ nullable: true, type: 'float' })
  marketCap: number = 0;

  @Column({ nullable: true })
  name: string = ''; 

  @Column({ nullable: true})
  ruName: string = "";

  @Column({ nullable: true})
  slug: string = '';

  @Column({ nullable: true, type: 'json' })
  tokenPlatformName: string = "";
  
  @Column({ nullable: true, type: 'float' })
  tvl: number = 0;

  @Column({ nullable: true, type: 'json' })
  tvlChangePercent: string = "";

  @Column({ nullable: true, type: 'float' })
  volume24h: number = 0;

  @Column({ nullable: true, type: 'json' })
  yesterday: string = "";
}
