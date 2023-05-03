import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

export default class CarsService {
  private _domain: CarsODM;
  constructor(domain: CarsODM) {
    this._domain = domain;
  }
  private newCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async create(car: ICar) {
    const carsODM = this._domain;
    const newCar = await carsODM.create(car);
    return this.newCarDomain(newCar);
  }

  public async getAll() {
    const carsODM = this._domain;
    const cars = await carsODM.find();    
    const carsArray = cars.map((car) => this.newCarDomain(car));
    return carsArray;
  }

  public async getById(id: string) {
    const carsODM = this._domain;
    const data = await carsODM.findById(id);
    if (!data) return null;
    return this.newCarDomain(data);
  }

  public async update(id: string, body: ICar) {
    const carsODM = this._domain;
    const data = await carsODM.update(id, body);
    if (!data) return null;
    return this.newCarDomain(data);
  }
}