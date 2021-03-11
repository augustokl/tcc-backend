import { inject, injectable } from 'tsyringe';

import ManualConf from '../infra/typeorm/entities/ManualConf';

import IConfigurationsManualRepository from '../repositories/IConfigurationsManualRepository';

@injectable()
class FindManualConfigService {
  constructor(
    @inject('ConfigurationsManualRepository')
    private configurationsManualRepository: IConfigurationsManualRepository,
  ) {}

  public async execute(): Promise<ManualConf | undefined> {
    const manualConf = this.configurationsManualRepository.findManualConfig();

    return manualConf;
  }
}

export default FindManualConfigService;
