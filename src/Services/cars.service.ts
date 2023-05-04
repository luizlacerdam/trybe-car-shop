import ICar from '../Interfaces/ICar';
import IVehicleValidation from '../Interfaces/IVehicleValidation';
import CarsODM from '../Models/CarsODM';
import VehicleTypes from '../utils/VehicleTypes';
import AbstractService from './AbstractService';

export default class CarsService extends AbstractService<ICar> {
  constructor(domain: CarsODM, validation: IVehicleValidation) {
    super(domain, VehicleTypes.CAR, validation);
  }
}