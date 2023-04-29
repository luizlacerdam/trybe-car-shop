import { Router } from 'express';
import MotocyclesService from '../Services/motocycles.service';
import MotocyclesController from '../Controllers/motocycles.controller';

const motocycleRouter = Router();
const motocycleService = new MotocyclesService();

motocycleRouter.post('/', (req, res, next) =>
  new MotocyclesController(req, res, next, motocycleService).addNewMotocycle());
motocycleRouter.get('/', (req, res, next) =>
  new MotocyclesController(req, res, next, motocycleService).getAll());
motocycleRouter.get('/:id', (req, res, next) =>
  new MotocyclesController(req, res, next, motocycleService).getById());
motocycleRouter.put('/:id', (req, res, next) =>
  new MotocyclesController(req, res, next, motocycleService).updateMotoById());

export default motocycleRouter;