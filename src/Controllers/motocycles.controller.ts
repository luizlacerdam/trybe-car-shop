import { NextFunction, Request, Response } from 'express';
import MotocyclesService from '../Services/motocycles.service';

export default class MotocyclesController {
  private _motocycleService: MotocyclesService;
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;

  constructor(
    req: Request, 
    res: Response, 
    next: NextFunction,
    motocycleService: MotocyclesService,
  ) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._motocycleService = motocycleService;
  }

  public async addNewMotocycle() {
    try {
      const newMoto = this._req.body;
      const data = await this._motocycleService.addNewMotocycle(newMoto);
      return this._res.status(201).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async getAll() {
    try {
      const data = await this._motocycleService.getAll();
      return this._res.status(200).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async getById() {
    try {
      const { id } = this._req.params;
      const data = await this._motocycleService.getById(id);
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
      const car = await this._motocycleService.getById(id);
      if (!car) {
        return this._res.status(404).json({ message: 'Motorcycle not found' });
      }
      
      const data = await this._motocycleService.updateMotoById(id, body);
      return this._res.status(200).json(data);
    } catch (error) {
      return this._res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}