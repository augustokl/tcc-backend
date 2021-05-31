import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateExecutedCommandDTO from '@modules/equipments/dtos/ICreateExecutedCommandDTO';

import CreateExecutedCommandDataService from '@modules/equipments/services/CreateExecutedCommandDataService';
import FindExecutedCommandService from '@modules/equipments/services/FindExecutedCommandService';

class ExecutedCommandController {
  public async create(data: ICreateExecutedCommandDTO): Promise<void> {
    const createExecutedCommandDataService = container.resolve(
      CreateExecutedCommandDataService,
    );

    await createExecutedCommandDataService.execute(data);
  }

  public async find(
    command: string
  ): Promise<boolean> {
    const findExecutedCommandService = container.resolve(
      FindExecutedCommandService,
    );

    const exists = await findExecutedCommandService.execute(command);

    return exists;
  }
}

export default ExecutedCommandController;
