import { inject, injectable } from 'tsyringe';

import AutomaticConf from '../infra/typeorm/entities/AutomaticConf';

import IConfigurationsAutomaticRepository from '../repositories/IConfigurationsAutomaticRepository';

@injectable()
class FindAutomaticConfigService {
  constructor(
    @inject('ConfigurationsAutomaticRepository')
    private configurationsAutomaticRepository: IConfigurationsAutomaticRepository,
  ) {}

  public async execute(): Promise<AutomaticConf | undefined> {
    const automaticConf = this.configurationsAutomaticRepository.findAutomaticConfig();

    return automaticConf;
  }
}

export default FindAutomaticConfigService;
