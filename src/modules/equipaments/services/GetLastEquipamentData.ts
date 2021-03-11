import { injectable, inject } from 'tsyringe';
import EquipamentData from '../infra/typeorm/entities/EquipamentData';

import IEquipamentsRepository from '../repositories/IEquipamentsRepository';

@injectable()
class GetLastEquipamentData {
  constructor(
    @inject('EquipamentsRepository')
    private equipamentsRepository: IEquipamentsRepository,
  ) {}

  public async execute(): Promise<EquipamentData | undefined> {
    const equipamentData = this.equipamentsRepository.findLastData();

    return equipamentData;
  }
}

export default GetLastEquipamentData;
