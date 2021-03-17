import { Router } from 'express';

import EquipmentsController from '../controllers/EquipmentsController';

const equipmentsRouter = Router();
const equipmentsController = new EquipmentsController();

equipmentsRouter.get('/', equipmentsController.findLast);

export default equipmentsRouter;
