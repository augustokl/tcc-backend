import EquipamentData from '@modules/equipaments/infra/typeorm/entities/EquipamentData';
import { getRepository, Repository } from 'typeorm';

import ICreateEquipamentDataDTO from '@modules/equipaments/dtos/ICreateEquipamentDataDTO';
import IEquipamanetRepository from '@modules/equipaments/repositories/IEquipamentsRepository';

class EquipamentsRepository implements IEquipamanetRepository {
  private repository: Repository<EquipamentData>;

  constructor() {
    this.repository = getRepository(EquipamentData);
  }

  public async create(data: ICreateEquipamentDataDTO): Promise<EquipamentData> {
    const equipamentData = this.repository.create(data);

    const newEquipamentData = await this.repository.save(equipamentData);

    return newEquipamentData;
  }

  public async findLastData(): Promise<EquipamentData | undefined> {
    const equipamentData = this.repository.findOne({
      order: { id: 'DESC' },
    });

    return equipamentData;
  }
}

export default EquipamentsRepository;
