import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindManualConfigService from '@modules/configurations/services/FindManualConfigService';
import UpdateManualConfigService from '@modules/configurations/services/UpdateManualConfigService';
import ManualConf from '../../typeorm/entities/ManualConf';

class ConfigurationsManual {
  public async find(request: Request, response: Response): Promise<Response> {
    const findManualConfigService = container.resolve(FindManualConfigService);

    const manualConf = await findManualConfigService.execute();

    return response.json(classToClass(manualConf));
  }

  public async findLocal(): Promise<ManualConf | undefined> {
    const findManualConfigService = container.resolve(FindManualConfigService);

    return await findManualConfigService.execute();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { active, fan, humidity, temperature, sombrite } = request.body;

    const updateManualConfigService = container.resolve(
      UpdateManualConfigService,
    );

    const manualConf = await updateManualConfigService.execute({
      active: Boolean(active),
      fan: Boolean(fan),
      humidity: Boolean(humidity),
      temperature: Boolean(temperature),
      sombrite: Boolean(sombrite)
    });

    return response.json(classToClass(manualConf));
  }
}

export default ConfigurationsManual;
