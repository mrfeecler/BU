import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { IeoIdoProject } from '../../core/schemas/ieo-ido/ieo-ido-project';

export class IeoIdoProjectService extends BaseService<IeoIdoProject> {
  constructor(private readonly repo: Repository<IeoIdoProject>) {
    super(repo);
  }

  async getByCoinKey(key: string): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ key });
    const datas = await query.getMany();  
    return datas;
  }
}
