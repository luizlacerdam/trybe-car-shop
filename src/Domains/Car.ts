import ICar from '../Interfaces/cars.interface';

export default class Car {
  private _model: string;
  private _year: number;
  private _color: string;
  private _status: boolean;
  private _buyValue: number;
  private _doorsQty: number;
  private _seatsQty: number;

  constructor(car: ICar) {
    this._model = car.model;
    this._year = car.year;
    this._color = car.color;
    this._status = car.status;
    this._buyValue = car.buyValue;
    this._doorsQty = car.doorsQty;
    this._seatsQty = car.seatsQty;
  }
}
