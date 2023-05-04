import { Router } from 'express';
import MotorcyclesService from '../Services/motorcycles.service';
import MotorcyclesController from '../Controllers/motocycles.controller';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import IdValidation from '../Middlewares/idValidation.middleware';
import VehiclesValidations from '../Validations/vehicles.validations';

const motorcycleRouter = Router();
const motorcyclesODM = new MotorcyclesODM();
const motorcycleService = new MotorcyclesService(motorcyclesODM, VehiclesValidations);

motorcycleRouter.post('/', (req, res, next) =>
  new MotorcyclesController(motorcycleService, req, res, next).create());
motorcycleRouter.get('/', (req, res, next) =>
  new MotorcyclesController(motorcycleService, req, res, next).getAll());
motorcycleRouter.get('/:id', IdValidation.validate, (req, res, next) =>
  new MotorcyclesController(motorcycleService, req, res, next).getById());
motorcycleRouter.put('/:id', IdValidation.validate, (req, res, next) =>
  new MotorcyclesController(motorcycleService, req, res, next).update());

export default motorcycleRouter;