import AutomaticConf from '../infra/typeorm/entities/AutomaticConf';

export default interface IConfigurationsAutomaticRepository {
  findAutomaticConfig(): Promise<AutomaticConf | undefined>;
  updateAutomaticConfig(automaticConfi: AutomaticConf): Promise<AutomaticConf>;
}
