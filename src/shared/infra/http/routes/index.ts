import { Router } from 'express';

import automaticConfRouter from '@modules/configurations/infra/http/routes/automaticConf.routes';
import manualConfRouter from '@modules/configurations/infra/http/routes/manualConf.routes';
import equipmentsRouter from '@modules/equipments/infra/http/routes/equipments.routes';

const routes = Router();

routes.use('/automatic-conf', automaticConfRouter);
routes.use('/manual-conf', manualConfRouter);
routes.use('/equipments', equipmentsRouter);

export default routes;
