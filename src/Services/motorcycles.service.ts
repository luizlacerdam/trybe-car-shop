import IMotorcycle from '../Interfaces/IMotorcycle';
import IVehicleValidation from '../Interfaces/IVehicleValidation';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import VehicleTypes from '../utils/VehicleTypes';
import AbstractService from './AbstractService';

export default class MotorcycleService extends AbstractService<IMotorcycle> {
  constructor(domain: MotorcyclesODM, validation: IVehicleValidation) {
    super(domain, VehicleTypes.MOTORCYCLE, validation);
  }
}