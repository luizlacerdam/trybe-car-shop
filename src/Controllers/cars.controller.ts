import { NextFunction, Request, Response } from 'express';
import CarsService from '../Services/cars.service';

export default class CarsController {
  private _carsService: CarsService;
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction, carsService: CarsService) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._carsService = carsService;
  }

  public async newCar() {
    try {
      const newCar = this._req.body;
      const data = await this._carsService.addNewCar(newCar);
      return this._res.status(201).json(data);
    } catch (error) {
      this._next(error);
    }
  }
}