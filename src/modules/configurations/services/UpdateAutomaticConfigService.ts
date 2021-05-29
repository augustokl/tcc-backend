import { inject, injectable } from 'tsyringe';
import IUpdateAutomaticConfigDTO from '../dtos/IUpdateAutomaticConfigDTO';

import AutomaticConf from '../infra/typeorm/entities/AutomaticConf';

import IConfigurationsAutomaticRepository from '../repositories/IConfigurationsAutomaticRepository';
import { extractDateSombrite } from '../utils/utils';

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
    activation_time,
    close_sombrite,
    open_sombrite
  }: IUpdateAutomaticConfigDTO): Promise<AutomaticConf | undefined> {
    const automaticConf = await this.configurationsAutomaticRepository.findAutomaticConfig();

    if (!automaticConf) {
      return undefined;
    }

    const sombrite = extractDateSombrite(open_sombrite, close_sombrite)

    automaticConf.min_humidity = min_humidity;
    automaticConf.max_humidity = max_humidity;
    automaticConf.min_temperature = min_temperature;
    automaticConf.max_temperature = max_temperature;
    automaticConf.open_sombrite = sombrite.open;
    automaticConf.close_sombrite = sombrite.close;
    automaticConf.activation_time = activation_time;
    automaticConf.updated_at = new Date();

    const newAutomaticConf = await this.configurationsAutomaticRepository.updateAutomaticConfig(
      automaticConf,
    );

    return newAutomaticConf;
  }
}

export default UpdateAutomaticConfigService;
