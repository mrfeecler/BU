import { Marquee } from '../../../core/schemas/common/marquee';
import { EntityManager } from 'typeorm';

export class SaveGlobal {
  private readonly globalRepo;

  constructor(private readonly em: EntityManager) {
    this.globalRepo = this.em.getRepository(Marquee);
  }

  async execute(data: any): Promise<any> {
    this.globalRepo.save(data);
    console.log(`Global inserted`);
  }
}
