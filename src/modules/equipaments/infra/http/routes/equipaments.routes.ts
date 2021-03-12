import { Router } from 'express';

import EquipamentsController from '../controllers/EquipamentsController';

const equipamentsRouter = Router();
const equipamentsController = new EquipamentsController();

equipamentsRouter.get('/', equipamentsController.findLast);
