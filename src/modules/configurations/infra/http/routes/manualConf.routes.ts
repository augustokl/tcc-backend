import { Router } from 'express';

import ConfigurationsManual from '../controllers/ConfigurationsManual';

const manualConfRouter = Router();
const configurationsManual = new ConfigurationsManual();

manualConfRouter.get('/', configurationsManual.find);
manualConfRouter.put('/', configurationsManual.update);

export default manualConfRouter;
