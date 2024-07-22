import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'fundraisings' })
export class Fundraising extends BaseSchema {

  @Column({ nullable: true, type: 'json' })
  category: string = ''; 

  @Column({ nullable: true })
  date: Date = new Date();
  
  @Column({ nullable: true, type: 'json' })
  funds: string = '';

  @Column({ nullable: true })
  hasFundingRounds: boolean = false;

  @Column({ nullable: true })
  icon: string = "";

  @Column({ nullable: true })
  key: string = '';
 
  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true, type: 'numeric' })
  raise: number = 0;

  @Column({ nullable: true })
  stage: string = '';

  @Column({ nullable: true })
  symbol: string = '';

  @Column({ nullable: true, type: 'numeric' })
  twitterScore: string = '';
}
