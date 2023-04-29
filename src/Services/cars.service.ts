import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

export default class CarsService {
  private newCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async addNewCar(car: ICar) {
    const carsODM = new CarsODM();
    const newCar = await carsODM.create(car);
    return this.newCarDomain(newCar);
  }

  public async getAll() {
    const carsODM = new CarsODM();
    const cars = await carsODM.find();    
    const carsArray = cars.map((car) => this.newCarDomain(car));
    return carsArray;
  }
}