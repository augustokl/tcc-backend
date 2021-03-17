import { inject, injectable } from 'tsyringe';
import IUpdateAutomaticConfigDTO from '../dtos/IUpdateAutomaticConfigDTO';

import AutomaticConf from '../infra/typeorm/entities/AutomaticConf';

import IConfigurationsAutomaticRepository from '../repositories/IConfigurationsAutomaticRepository';

@injectable()
class UpdateAutomaticConfigService {
  constructor(
    @inject('ConfigurationsAutomaticRepository')
    private configurationsAutomaticRepository: IConfigurationsAutomaticRepository,
  ) {}

  public async execute({
    min_humidity,
    max_humidity,
    min_temperature,
    max_temperature,
  }: IUpdateAutomaticConfigDTO): Promise<AutomaticConf | undefined> {
    const automaticConf = await this.configurationsAutomaticRepository.findAutomaticConfig();

    if (!automaticConf) {
      return undefined;
    }

    automaticConf.min_humidity = min_humidity;
    automaticConf.max_humidity = max_humidity;
    automaticConf.min_temperature = min_temperature;
    automaticConf.max_temperature = max_temperature;
    automaticConf.updated_at = new Date();

    const newAutomaticConf = await this.configurationsAutomaticRepository.updateAutomaticConfig(
      automaticConf,
    );

    return newAutomaticConf;
  }
}

export default UpdateAutomaticConfigService;
