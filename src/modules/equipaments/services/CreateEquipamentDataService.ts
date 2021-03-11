import { injectable, inject } from 'tsyringe';

import EquipamentData from '../infra/typeorm/entities/EquipamentData';

import ICreateEquipamentDataDTO from '../dtos/ICreateEquipamentDataDTO';
import IEquipamentsRepository from '../repositories/IEquipamentsRepository';

@injectable()
class CreateEquipamentDataService {
  constructor(
    @inject('EquipamentsRepository')
    private equipamentsRepository: IEquipamentsRepository,
  ) {}

  public async execute(
    data: ICreateEquipamentDataDTO,
  ): Promise<EquipamentData> {
    const equipamentData = await this.equipamentsRepository.create(data);

    return equipamentData;
  }
}

export default CreateEquipamentDataService;
