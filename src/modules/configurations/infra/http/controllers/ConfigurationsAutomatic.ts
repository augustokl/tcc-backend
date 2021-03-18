import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindAutomaticConfigService from '@modules/configurations/services/FindAutomaticConfigService';
import UpdateAutomaticConfigService from '@modules/configurations/services/UpdateAutomaticConfigService';

class ConfigurationsAutomatic {
  public async find(request: Request, response: Response): Promise<Response> {
    const findAutomaticConfigService = container.resolve(
      FindAutomaticConfigService,
    );

    const automaticChanges = await findAutomaticConfigService.execute();

    return response.json(classToClass(automaticChanges));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      min_humidity,
      max_humidity,
      min_temperature,
      max_temperature,
    } = request.body;

    const updateAutomaticConfigService = container.resolve(
      UpdateAutomaticConfigService,
    );

    const automaticConf = await updateAutomaticConfigService.execute({
      min_humidity: Number(min_humidity),
      max_humidity: Number(max_humidity),
      min_temperature: Number(min_temperature),
      max_temperature: Number(max_temperature),
    });

    return response.json(automaticConf);
  }
}

export default ConfigurationsAutomatic;
