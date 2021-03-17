import { container } from 'tsyringe';

import IEquipmentsRepository from '@modules/equipments/repositories/IEquipmentsRepository';
import EquipmentsRepository from '@modules/equipments/infra/typeorm/repositories/EquipmentsRepository';

import IConfigurationsAutomaticRepository from '@modules/configurations/repositories/IConfigurationsAutomaticRepository';
import ConfigurationsAutomaticRepository from '@modules/configurations/infra/typeorm/repositories/ConfigurationsAutomaticRepository';

import IConfigurationsManualRepository from '@modules/configurations/repositories/IConfigurationsManualRepository';
import ConfigurationsManualRepository from '@modules/configurations/infra/typeorm/repositories/ConfigurationsManualRepository';

container.registerSingleton<IEquipmentsRepository>(
  'EquipmentsRepository',
  EquipmentsRepository,
);

container.registerSingleton<IConfigurationsAutomaticRepository>(
  'ConfigurationsAutomaticRepository',
  ConfigurationsAutomaticRepository,
);

container.registerSingleton<IConfigurationsManualRepository>(
  'ConfigurationsManualRepository',
  ConfigurationsManualRepository,
);
