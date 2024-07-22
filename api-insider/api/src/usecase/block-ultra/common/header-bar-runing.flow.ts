import { Repository } from 'typeorm';
import { Marquee } from '../../../core/schemas/common/marquee';

export class HeaderBarRuningFlow {
  constructor(private readonly repo: Repository<Marquee>) {}

  async execute() {
    const result = await this.repo.find({
      order: { created_at: 'DESC' },
      take: 1,
    });
    return result[0];
  }
}

export default HeaderBarRuningFlow;
