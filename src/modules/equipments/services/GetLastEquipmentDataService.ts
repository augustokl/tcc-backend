import { injectable, inject } from 'tsyringe';
import EquipmentData from '../infra/typeorm/entities/EquipmentData';

import IEquipmentsRepository from '../repositories/IEquipmentsRepository';

@injectable()
class GetLastEquipmentDataService {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
  ) {}

  public async execute(): Promise<EquipmentData | undefined> {
    const equipmentData = this.equipmentsRepository.findLastData();

    return equipmentData;
  }
}

export default GetLastEquipmentDataService;
