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
  public async getAll() {
    try {
      const data = await this._carsService.getAll();
      return this._res.status(200).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async getById() {
    try {
      const { id } = this._req.params;
      const data = await this._carsService.getById(id);
      if (!data) {
        return this._res.status(404).json({ message: 'Car not found' });
      }
      return this._res.status(200).json(data);
    } catch (error) {
      return this._res.status(422).json({ message: 'Invalid mongo id' });
      // this._next(error);
    }
  }
  public async updateCarById() {
    try {
      const { id } = this._req.params;
      const { body } = this._req;
      const car = await this._carsService.getById(id);
      if (!car) {
        return this._res.status(404).json({ message: 'Car not found' });
      }
      
      const data = await this._carsService.updateCarById(id, body);
      return this._res.status(200).json(data);
    } catch (error) {
      return this._res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}