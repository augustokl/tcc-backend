import EquipmentData from '@modules/equipments/infra/typeorm/entities/EquipmentData';
import { getRepository, Repository } from 'typeorm';

import ICreateEquipmentDataDTO from '@modules/equipments/dtos/ICreateEquipmentDataDTO';
import IEquipamanetRepository from '@modules/equipments/repositories/IEquipmentsRepository';

class EquipmentsRepository implements IEquipamanetRepository {
  private repository: Repository<EquipmentData>;

  constructor() {
    this.repository = getRepository(EquipmentData);
  }

  public async create(data: ICreateEquipmentDataDTO): Promise<EquipmentData> {
    const equipmentData = this.repository.create(data);

    const newEquipmentData = await this.repository.save(equipmentData);

    return newEquipmentData;
  }

  public async findLastData(): Promise<EquipmentData | undefined> {
    const equipmentData = this.repository.findOne({
      order: { id: 'DESC' },
    });

    return equipmentData;
  }
}

export default EquipmentsRepository;
