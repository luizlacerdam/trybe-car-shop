import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IService from '../Interfaces/IService';
import CarsODM from '../Models/CarsODM';

export default class CarsService implements IService<ICar, Car> {
  private _domain: CarsODM;
  constructor(domain: CarsODM) {
    this._domain = domain;
  }
  private newDomain(vehicle: ICar | null): Car | null {
    if (vehicle) {
      return new Car(vehicle);
    }
    return null;
  }
  public async create(vehicle: ICar):Promise<Car | null> {
    const carsODM = this._domain;
    const newCar = await carsODM.create(vehicle);
    return this.newDomain(newCar);
  }

  public async getAll():Promise<(Car | null)[]> {
    const carsODM = this._domain;
    const cars = await carsODM.find();    
    const carsArray = cars.map((car) => this.newDomain(car));
    return carsArray;
  }

  public async getById(id: string):Promise<Car | null> {
    const carsODM = this._domain;
    const data = await carsODM.findById(id);
    if (!data) return null;
    return this.newDomain(data);
  }

  public async update(id: string, body: ICar): Promise<Car | null> {
    const carsODM = this._domain;
    const data = await carsODM.update(id, body);
    if (!data) return null;
    return this.newDomain(data);
  }
}