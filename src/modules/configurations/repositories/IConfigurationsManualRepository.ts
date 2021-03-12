import ManualConf from '../infra/typeorm/entities/ManualConf';

import IUpdateManualConfigDTO from '../dtos/IUpdateManualConfigDTO';

export default interface IConfigurationsManualRepository {
  findManualConfig(): Promise<ManualConf | undefined>;
  updateManualConfig(data: IUpdateManualConfigDTO): Promise<ManualConf>;
}
