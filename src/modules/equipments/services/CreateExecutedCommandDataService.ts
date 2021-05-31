import { injectable, inject } from 'tsyringe';

import IExecutedCommandRepository from '../repositories/IExecutedCommandRepository';
import ICreateExecutedCommandDTO from '../dtos/ICreateExecutedCommandDTO';

@injectable()
class CreateExecutedCommandDataService {
  constructor(
    @inject('ExecutedCommandsRepository')
    private executedCommandRepository: IExecutedCommandRepository,
  ) {}

  public async execute(data: ICreateExecutedCommandDTO): Promise<void> {
     await this.executedCommandRepository.create(data);
  }
}

export default CreateExecutedCommandDataService;
