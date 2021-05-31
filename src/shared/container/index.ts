import { container } from 'tsyringe';

import IEquipmentsRepository from '@modules/equipments/repositories/IEquipmentsRepository';
import EquipmentsRepository from '@modules/equipments/infra/typeorm/repositories/EquipmentsRepository';

import IExecutedCommandRepository from '@modules/equipments/repositories/IExecutedCommandRepository';
import ExecutedCommandRepository from '@modules/equipments/infra/typeorm/repositories/ExecutedCommandRepository';

import IConfigurationsAutomaticRepository from '@modules/configurations/repositories/IConfigurationsAutomaticRepository';
import ConfigurationsAutomaticRepository from '@modules/configurations/infra/typeorm/repositories/ConfigurationsAutomaticRepository';

import IConfigurationsManualRepository from '@modules/configurations/repositories/IConfigurationsManualRepository';
import ConfigurationsManualRepository from '@modules/configurations/infra/typeorm/repositories/ConfigurationsManualRepository';

container.registerSingleton<IEquipmentsRepository>(
  'EquipmentsRepository',
  EquipmentsRepository,
);

container.registerSingleton<IExecutedCommandRepository>(
  'ExecutedCommandsRepository',
  ExecutedCommandRepository,
);

container.registerSingleton<IConfigurationsAutomaticRepository>(
  'ConfigurationsAutomaticRepository',
  ConfigurationsAutomaticRepository,
);

container.registerSingleton<IConfigurationsManualRepository>(
  'ConfigurationsManualRepository',
  ConfigurationsManualRepository,
);
