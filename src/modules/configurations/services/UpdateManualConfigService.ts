import { inject, injectable } from 'tsyringe';

import ManualConf from '../infra/typeorm/entities/ManualConf';

import IConfigurationsManualRepository from '../repositories/IConfigurationsManualRepository';

@injectable()
class UpdateManualConfigService {
  constructor(
    @inject('IConfigurationsManualRepository')
    private configurationsManualRepository: IConfigurationsManualRepository,
  ) {}

  public async execute(manualConf: ManualConf): Promise<ManualConf> {
    const newManualConf = this.configurationsManualRepository.updateManualConfig(
      manualConf,
    );

    return newManualConf;
  }
}

export default UpdateManualConfigService;
