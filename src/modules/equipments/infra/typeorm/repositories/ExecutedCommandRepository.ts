import ExecutedCommand from '@modules/equipments/infra/typeorm/entities/ExecutedCommand';
import { getRepository, Repository, Between } from 'typeorm';

import ICreateExecutedCommandDTO from '@modules/equipments/dtos/ICreateExecutedCommandDTO';
import IExecutedCommandRepository from '@modules/equipments/repositories/IExecutedCommandRepository';

class ExecutedCommandRepository implements IExecutedCommandRepository {
  private repository: Repository<ExecutedCommand>;

  constructor() {
    this.repository = getRepository(ExecutedCommand);
  }

  public async create(data: ICreateExecutedCommandDTO): Promise<void> {
    const equipmentData = this.repository.create(data);

    await this.repository.save(equipmentData);
  }

  public async find(command: string): Promise<boolean> {
    const startOfDay = new Date()
    startOfDay.setHours(0,0,0,0);

    const endOfDay = new Date()
    endOfDay.setHours(23,59,59,999);

    const executedCommand = await this.repository.find({
      where: {
        command: command,
        created_at: Between(startOfDay, endOfDay)
      }
    });

    return !!executedCommand;
  }
}

export default ExecutedCommandRepository;
