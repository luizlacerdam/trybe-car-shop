/* eslint-disable @typescript-eslint/no-useless-constructor */
import { NextFunction, Request, Response } from 'express';
import MotorcyclesService from '../Services/motorcycles.service';
import AbstractController from './AbstractController';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcyclesController extends AbstractController<IMotorcycle> {
  constructor(
    carsService: MotorcyclesService,
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