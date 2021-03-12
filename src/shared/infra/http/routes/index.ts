import { Router } from 'express';

import automaticConfRouter from '@modules/configurations/infra/http/routes/automaticConf.routes';
import manualConfRouter from '@modules/configurations/infra/http/routes/manualConf.routes';
import equipamentsRouter from '@modules/equipaments/infra/http/routes/equipaments.routes';

const routes = Router();

routes.use('/automatic-conf', automaticConfRouter);
routes.use('/manual-conf', manualConfRouter);
routes.use('/equipaments', equipamentsRouter);

export default routes;
