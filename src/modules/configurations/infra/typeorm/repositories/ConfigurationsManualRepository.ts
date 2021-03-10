import ManualConf from '../entities/ManualConf';
import { getRepository, Repository } from 'typeorm';

import IConfigurationsManualRepository from '@modules/configurations/repositories/IConfigurationsManualRepository';

class ConfigurationsManualRepository
  implements IConfigurationsManualRepository {
  private repository: Repository<ManualConf>;

  constructor() {
    this.repository = getRepository(ManualConf);
  }

  public async findManualConfig(): Promise<ManualConf | undefined> {
    const manualConf = await this.repository.findOne({
      order: { id: 'ASC' },
    });

    return manualConf;
  }
  public async updateManualConfig(manualConf: ManualConf): Promise<ManualConf> {
    return await this.repository.save(manualConf);
  }
}

export default ConfigurationsManualRepository;
