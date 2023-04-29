import ICar from '../Interfaces/ICar';

export default class Car {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}
