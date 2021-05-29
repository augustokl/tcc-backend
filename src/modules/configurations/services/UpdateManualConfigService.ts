import { inject, injectable } from 'tsyringe';
import IUpdateManualConfigDTO from '../dtos/IUpdateManualConfigDTO';

import ManualConf from '../infra/typeorm/entities/ManualConf';

import IConfigurationsManualRepository from '../repositories/IConfigurationsManualRepository';

@injectable()
class UpdateManualConfigService {
  constructor(
    @inject('ConfigurationsManualRepository')
    private configurationsManualRepository: IConfigurationsManualRepository,
  ) {}

  public async execute({
    active,
    fan,
    humidity,
    temperature,
    sombrite
  }: IUpdateManualConfigDTO): Promise<ManualConf | undefined> {
    const manualConf = await this.configurationsManualRepository.findManualConfig();

    if (!manualConf) {
      return undefined;
    }

    manualConf.active = active;
    manualConf.fan = fan;
    manualConf.humidity = humidity;
    manualConf.temperature = temperature;
    manualConf.sombrite = sombrite;
    manualConf.updated_at = new Date();

    const newManualConf = await this.configurationsManualRepository.updateManualConfig(
      manualConf,
    );

    return newManualConf;
  }
}

export default UpdateManualConfigService;
