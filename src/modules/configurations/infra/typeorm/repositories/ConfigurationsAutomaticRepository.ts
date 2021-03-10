import AutomaticConf from '../entities/AutomaticConf';
import { getRepository, Repository } from 'typeorm';

import IConfigurationsAutomaticRepository from '@modules/configurations/repositories/IConfigurationsAutomaticRepository';

class ConfigurationsAutomaticRepository
  implements IConfigurationsAutomaticRepository {
  private repository: Repository<AutomaticConf>;

  constructor() {
    this.repository = getRepository(AutomaticConf);
  }

  public async findAutomaticConfig(): Promise<AutomaticConf | undefined> {
    const automaticConig = await this.repository.findOne({
      order: { id: 'ASC' },
    });

    return automaticConig;
  }
  public async updateAutomaticConfig(
    automaticConf: AutomaticConf,
  ): Promise<AutomaticConf> {
    return await this.repository.save(automaticConf);
  }
}

export default ConfigurationsAutomaticRepository;
