import AutomaticConf from '../infra/typeorm/entities/AutomaticConf';

import IUpdateAutomaticConfigDTO from '../dtos/IUpdateAutomaticConfigDTO';

export default interface IConfigurationsAutomaticRepository {
  findAutomaticConfig(): Promise<AutomaticConf | undefined>;
  updateAutomaticConfig(
    data: IUpdateAutomaticConfigDTO,
  ): Promise<AutomaticConf>;
}
