import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import VehicleTypes from '../utils/VehicleTypes';
import AbstractService from './AbstractService';

export default class MotorcycleService extends AbstractService<IMotorcycle> {
  constructor(domain: MotorcyclesODM) {
    super(domain, VehicleTypes.MOTORCYCLE);
  }
}