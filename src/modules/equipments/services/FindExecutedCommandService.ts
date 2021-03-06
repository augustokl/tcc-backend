import { injectable, inject } from 'tsyringe';

import IExecutedCommandRepository from '../repositories/IExecutedCommandRepository';

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
