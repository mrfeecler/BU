import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { BlockChain } from '../../core/schemas/blockchain';

export class BlockchainService extends BaseService<BlockChain> {
  constructor(private readonly repo: Repository<BlockChain>) {
    super(repo);
  }
}
