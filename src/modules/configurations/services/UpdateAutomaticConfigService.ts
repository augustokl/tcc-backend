import { inject, injectable } from 'tsyringe';

import AutomaticConf from '../infra/typeorm/entities/AutomaticConf';

import IConfigurationsAutomaticRepository from '../repositories/IConfigurationsAutomaticRepository';

@injectable()
class UpdateAutomaticConfigService {
  constructor(
    @inject('IConfigurationsAutomaticRepository')
    private configurationsAutomaticRepository: IConfigurationsAutomaticRepository,
  ) {}

  public async execute(automaticConf: AutomaticConf): Promise<AutomaticConf> {
    const newAutomaticConf = this.configurationsAutomaticRepository.updateAutomaticConfig(
      automaticConf,
    );

    return newAutomaticConf;
  }
}

export default UpdateAutomaticConfigService;
