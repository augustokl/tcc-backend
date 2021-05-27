import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AutomaticConf from '../../typeorm/entities/AutomaticConf';
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

  public async findLocal(): Promise<AutomaticConf | undefined> {
    const findAutomaticConfigService = container.resolve(
      FindAutomaticConfigService,
    );

    return await findAutomaticConfigService.execute();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      min_humidity,
      max_humidity,
      min_temperature,
      max_temperature,
      activation_time,
      close_sombrite,
      open_sombrite,
    } = request.body;

    const updateAutomaticConfigService = container.resolve(
      UpdateAutomaticConfigService,
    );

    const automaticConf = await updateAutomaticConfigService.execute({
      min_humidity: Number(min_humidity),
      max_humidity: Number(max_humidity),
      min_temperature: Number(min_temperature),
      max_temperature: Number(max_temperature),
      activation_time: Number(activation_time),
      close_sombrite: String(close_sombrite),
      open_sombrite: String(open_sombrite),
    });

    return response.json(automaticConf);
  }
}

export default ConfigurationsAutomatic;
