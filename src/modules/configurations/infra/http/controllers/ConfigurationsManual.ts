import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindManualConfigService from '@modules/configurations/services/FindManualConfigService';
import UpdateManualConfigService from '@modules/configurations/services/UpdateManualConfigService';

class ConfigurationsManual {
  public async find(request: Request, response: Response): Promise<Response> {
    const findManualConfigService = container.resolve(FindManualConfigService);

    const manualConf = await findManualConfigService.execute();

    return response.json(classToClass(manualConf));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { active, fan, humidity, temperature } = request.body;

    const updateManualConfigService = container.resolve(
      UpdateManualConfigService,
    );

    const manualConf = await updateManualConfigService.execute({
      active: Boolean(active),
      fan: Boolean(fan),
      humidity: Boolean(humidity),
      temperature: Boolean(temperature),
    });

    return response.json(classToClass(manualConf));
  }
}

export default ConfigurationsManual;
