import { Router } from 'express';
import CarsController from '../Controllers/cars.controller';
import CarsService from '../Services/cars.service';

const carsRoutes = Router();
const carsService = new CarsService();

carsRoutes.post('/', (req, res, next) => new CarsController(req, res, next, carsService).newCar());

export default carsRoutes;