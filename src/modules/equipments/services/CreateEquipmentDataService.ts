import { injectable, inject } from 'tsyringe';

import EquipmentData from '../infra/typeorm/entities/EquipmentData';

import ICreateEquipmentDataDTO from '../dtos/ICreateEquipmentDataDTO';
import IEquipmentsRepository from '../repositories/IEquipmentsRepository';

@injectable()
class CreateEquipmentDataService {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
  ) {}

  public async execute(data: ICreateEquipmentDataDTO): Promise<EquipmentData> {
    const equipmentData = await this.equipmentsRepository.create(data);

    return equipmentData;
  }
}

export default CreateEquipmentDataService;
