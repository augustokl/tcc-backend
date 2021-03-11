import { container } from 'tsyringe';

import IEquipamentsRepository from '@modules/equipaments/repositories/IEquipamentsRepository';
import EquipamentsRepository from '@modules/equipaments/infra/typeorm/repositories/EquipamentsRepository';

import IConfigurationsAutomaticRepository from '@modules/configurations/repositories/IConfigurationsAutomaticRepository';
import ConfigurationsAutomaticRepository from '@modules/configurations/infra/typeorm/repositories/ConfigurationsAutomaticRepository';

import IConfigurationsManualRepository from '@modules/configurations/repositories/IConfigurationsManualRepository';
import ConfigurationsManualRepository from '@modules/configurations/infra/typeorm/repositories/ConfigurationsManualRepository';

container.registerSingleton<IEquipamentsRepository>(
  'EquipamentsRepository',
  EquipamentsRepository,
);

container.registerSingleton<IConfigurationsAutomaticRepository>(
  'ConfigurationsAutomaticRepository',
  ConfigurationsAutomaticRepository,
);

container.registerSingleton<IConfigurationsManualRepository>(
  'ConfigurationsManualRepository',
  ConfigurationsManualRepository,
);
