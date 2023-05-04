/* eslint-disable @typescript-eslint/no-useless-constructor */
import { NextFunction, Request, Response } from 'express';
import CarsService from '../Services/cars.service';
import AbstractController from './AbstractController';
import ICar from '../Interfaces/ICar';

export default class CarsController extends AbstractController<ICar> {
  constructor(
    carsService: CarsService,
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) {
    super(
      carsService,
      req,
      res,
      next,
    );
  }
}