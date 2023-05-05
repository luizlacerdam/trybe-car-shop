import { Router } from 'express';
import CarsController from '../Controllers/cars.controller';
import CarsService from '../Services/cars.service';
import CarsODM from '../Models/CarsODM';
import IdValidation from '../Middlewares/idValidation.middleware';
import VehiclesValidations from '../Validations/vehicles.validations';
import ValidateRequiredFields from '../Middlewares/validateRequiredFields';

const carsODM = new CarsODM();
const carsRoutes = Router();
const carsService = new CarsService(carsODM, VehiclesValidations);

carsRoutes.post(
  '/', 
  ValidateRequiredFields.verifyRequiredFields('car'),
  (req, res, next) => new CarsController(carsService, req, res, next).create(),
);
carsRoutes.get('/', (req, res, next) => new CarsController(carsService, req, res, next).getAll());
carsRoutes.get('/:id', IdValidation.validate, (req, res, next) =>
  new CarsController(carsService, req, res, next).getById());
carsRoutes.put(
  '/:id', 
  ValidateRequiredFields.verifyRequiredFields('car'),
  IdValidation.validate, 
  (req, res, next) =>
    new CarsController(carsService, req, res, next).update(),
);

export default carsRoutes;