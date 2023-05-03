import { Router } from 'express';
import CarsController from '../Controllers/cars.controller';
import CarsService from '../Services/cars.service';
import CarsODM from '../Models/CarsODM';

const carsODM = new CarsODM();
const carsRoutes = Router();
const carsService = new CarsService(carsODM);

carsRoutes.post('/', (req, res, next) => new CarsController(req, res, next, carsService).newCar());
carsRoutes.get('/', (req, res, next) => new CarsController(req, res, next, carsService).getAll());
carsRoutes.get('/:id', (req, res, next) =>
  new CarsController(req, res, next, carsService).getById());
carsRoutes.put('/:id', (req, res, next) =>
  new CarsController(req, res, next, carsService).updateCarById());

export default carsRoutes;