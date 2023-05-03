import { NextFunction, Request, Response } from 'express';
import MotorcyclesService from '../Services/motorcycles.service';

export default class MotorcyclesController {
  private _motorcycleService: MotorcyclesService;
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;

  constructor(
    req: Request, 
    res: Response, 
    next: NextFunction,
    motorcycleService: MotorcyclesService,
  ) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._motorcycleService = motorcycleService;
  }

  public async addNewMotorcycle() {
    try {
      const newMoto = this._req.body;
      const data = await this._motorcycleService.create(newMoto);
      return this._res.status(201).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async getAll() {
    try {
      const data = await this._motorcycleService.getAll();
      return this._res.status(200).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async getById() {
    try {
      const { id } = this._req.params;
      const data = await this._motorcycleService.getById(id);
      if (!data) {
        return this._res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this._res.status(200).json(data);
    } catch (error) {
      return this._res.status(422).json({ message: 'Invalid mongo id' });
      // this._next(error);
    }
  }
  public async updateMotoById() {
    try {
      const { id } = this._req.params;
      const { body } = this._req;
      const car = await this._motorcycleService.getById(id);
      if (!car) {
        return this._res.status(404).json({ message: 'Motorcycle not found' });
      }
      
      const data = await this._motorcycleService.update(id, body);
      return this._res.status(200).json(data);
    } catch (error) {
      return this._res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}