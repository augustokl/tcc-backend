import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindManualConfigService from '@modules/configurations/services/FindManualConfigService';
import UpdateManualConfigService from '@modules/configurations/services/UpdateManualConfigService';

class ConfigurationsManual {
  public async find(request: Request, response: Response): Promise<Response> {
    const findManualConfigService = container.resolve(FindManualConfigService);

    const manualChanges = await findManualConfigService.execute();

    return response.json(manualChanges);
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

    return response.json(manualConf);
  }
}

export default ConfigurationsManual;
