import Car from '../Domains/Car';
import ICar from '../Interfaces/cars.interface';
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
}