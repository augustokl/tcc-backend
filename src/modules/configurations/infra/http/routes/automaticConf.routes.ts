import { Router } from 'express';

import ConfigurationsAutomatic from '../controllers/ConfigurationsAutomatic';

const equipamentsRouter = Router();
const configurationsAutomatic = new ConfigurationsAutomatic();

equipamentsRouter.get('/', configurationsAutomatic.find);
equipamentsRouter.put('/', configurationsAutomatic.update);
