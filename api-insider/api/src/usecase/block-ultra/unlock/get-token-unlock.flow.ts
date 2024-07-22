import { ITokenUnlock } from '../../../core/interfaces/token-unlock';

export class GetTokenUnlockFlow {
  constructor(private readonly service: ITokenUnlock) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    query.where('key = :key', { key: key });
    const coin = query.getOne();
    return coin;
  }
}

export default GetTokenUnlockFlow;
