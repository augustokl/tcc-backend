import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreateEquipmentDataDTO from '@modules/equipments/dtos/ICreateEquipmentDataDTO';

import CreateEquipmentDataService from '@modules/equipments/services/CreateEquipmentDataService';
import GetLastEquipmentDataService from '@modules/equipments/services/GetLastEquipmentDataService';
import { classToClass } from 'class-transformer';

class EquipmentsController {
  public async create(data: ICreateEquipmentDataDTO): Promise<void> {
    const createEquipmentDataService = container.resolve(
      CreateEquipmentDataService,
    );

    await createEquipmentDataService.execute(data);
  }

  public async findLast(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getLastEquipamnetDataService = container.resolve(
      GetLastEquipmentDataService,
    );

    const lastEquipmentData = await getLastEquipamnetDataService.execute();

    return response.json(classToClass(lastEquipmentData));
  }
}

export default EquipmentsController;
