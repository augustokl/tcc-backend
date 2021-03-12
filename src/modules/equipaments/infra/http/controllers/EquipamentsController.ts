import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateEquipamentDataDTO from '@modules/equipaments/dtos/ICreateEquipamentDataDTO';

import CreateEquipamentDataService from '@modules/equipaments/services/CreateEquipamentDataService';
import GetLastEquipamentDataService from '@modules/equipaments/services/GetLastEquipamentDataService';

class EquipamentsController {
  public async create(data: ICreateEquipamentDataDTO): Promise<void> {
    const createEquipamentDataService = container.resolve(
      CreateEquipamentDataService,
    );

    await createEquipamentDataService.execute(data);
  }

  public async findLast(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getLastEquipamnetDataService = container.resolve(
      GetLastEquipamentDataService,
    );

    const lastEquipamentData = getLastEquipamnetDataService.execute();

    return response.json(lastEquipamentData);
  }
}

export default EquipamentsController;
