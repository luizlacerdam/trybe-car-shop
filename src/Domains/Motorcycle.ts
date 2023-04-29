import IMotorcycle from '../Interfaces/IMotorcycle';

export default class Motorcycle {
  private category: 'Street' | 'Custom' | 'Trail';
  private engineCapacity: number;

  constructor(car: IMotorcycle) {
    this.category = car.category;
    this.engineCapacity = car.engineCapacity;
  }
}
