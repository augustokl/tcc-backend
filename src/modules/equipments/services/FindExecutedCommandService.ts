import { injectable, inject } from 'tsyringe';
import EquipmentData from '../infra/typeorm/entities/EquipmentData';

import IExecutedCommandRepository from '../repositories/IExecutedCommandRepository';
import ICreateExecutedCommandDTO from '../dtos/ICreateExecutedCommandDTO';

@injectable()
class FindExecutedCommandService {
  constructor(
    @inject('ExecutedCommandsRepository')
    private executedCommandRepository: IExecutedCommandRepository,
  ) {}

  public async execute(command: string): Promise<boolean> {
    const exists = this.executedCommandRepository.find(command);

    return exists;
  }
}

export default FindExecutedCommandService;
