import { NextFunction, Request, Response } from 'express';
import AbstractService from '../Services/AbstractService';

export default class AbstractController<T> {
  private _service: AbstractService<T>;
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  constructor(
    service: AbstractService<T>,
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = service;
  }
  public async create() {
    try {
      const vehicle = this._req.body;
      const data = await this._service.create(vehicle);
      return this._res.status(201).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async getAll() {
    try {
      const data = await this._service.getAll();
      return this._res.status(200).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async getById() {
    try {
      const { id } = this._req.params;
      const data = await this._service.getById(id);
      return this._res.status(200).json(data);
    } catch (error) {
      this._next(error);
    }
  }
  public async update() {
    try {
      const { id } = this._req.params;
      const { body } = this._req;
      const data = await this._service.update(id, body);
      return this._res.status(200).json(data);
    } catch (error) {
      this._next(error);
    }
  }
}