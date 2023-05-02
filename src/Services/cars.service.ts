import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

// classe generic
export default class CarsService {
  private newCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  public async addNewCar(car: ICar) {
    const carsODM = new CarsODM(); // aqui
    const newCar = await carsODM.create(car);
    return this.newCarDomain(newCar);
  }

  public async getAll() {
    const carsODM = new CarsODM();
    const cars = await carsODM.find();    
    const carsArray = cars.map((car) => this.newCarDomain(car));
    return carsArray;
  }

  public async getById(id: string) {
    const carsODM = new CarsODM();
    const data = await carsODM.findById(id);
    if (!data) return null;
    return this.newCarDomain(data);
  }

  public async updateCarById(id: string, body: ICar) {
    const carsODM = new CarsODM();
    const data = await carsODM.updateCar(id, body);
    if (!data) return null;
    return this.newCarDomain(data);
  }
}