import { Router } from 'express';

import ConfigurationsManual from '../controllers/ConfigurationsManual';

const equipamentsRouter = Router();
const configurationsManual = new ConfigurationsManual();

equipamentsRouter.get('/', configurationsManual.find);
equipamentsRouter.put('/', configurationsManual.update);
