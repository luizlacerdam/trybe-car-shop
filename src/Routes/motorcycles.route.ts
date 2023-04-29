import { Router } from 'express';
import MotorcyclesService from '../Services/motorcycles.service';
import MotorcyclesController from '../Controllers/motocycles.controller';

const motorcycleRouter = Router();
const motorcycleService = new MotorcyclesService();

motorcycleRouter.post('/', (req, res, next) =>
  new MotorcyclesController(req, res, next, motorcycleService).addNewMotorcycle());
motorcycleRouter.get('/', (req, res, next) =>
  new MotorcyclesController(req, res, next, motorcycleService).getAll());
motorcycleRouter.get('/:id', (req, res, next) =>
  new MotorcyclesController(req, res, next, motorcycleService).getById());
motorcycleRouter.put('/:id', (req, res, next) =>
  new MotorcyclesController(req, res, next, motorcycleService).updateMotoById());

export default motorcycleRouter;