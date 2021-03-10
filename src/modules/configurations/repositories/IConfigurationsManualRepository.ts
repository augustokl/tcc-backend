import ManualConf from '../infra/typeorm/entities/ManualConf';

export default interface IConfigurationsManualRepository {
  findManualConfig(): Promise<ManualConf | undefined>;
  updateManualConfig(manualConf: ManualConf): Promise<ManualConf>;
}
