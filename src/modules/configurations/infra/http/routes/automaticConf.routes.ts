import { Router } from 'express';

import ConfigurationsAutomatic from '../controllers/ConfigurationsAutomatic';

const automaticConfigRouter = Router();
const configurationsAutomatic = new ConfigurationsAutomatic();

automaticConfigRouter.get('/', configurationsAutomatic.find);
automaticConfigRouter.put('/', configurationsAutomatic.update);

export default automaticConfigRouter;
