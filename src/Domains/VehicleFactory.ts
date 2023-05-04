import ICar from '../Interfaces/ICar';
import IMotorcycle from '../Interfaces/IMotorcycle';
import VehicleTypes from '../utils/VehicleTypes';
import Car from './Car';
import Motorcycle from './Motorcycle';

export default class VehicleFactory {
  public static createDomain<T>(type: string, vehicle: T) {
    if (type === VehicleTypes.CAR) {
      return new Car(vehicle as unknown as ICar);
    }
    if (type === VehicleTypes.MOTORCYCLE) {
      return new Motorcycle(vehicle as unknown as IMotorcycle);
    }
  }
}