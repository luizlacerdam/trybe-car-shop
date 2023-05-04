import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';
import VehicleTypes from '../utils/VehicleTypes';
import AbstractService from './AbstractService';

export default class CarsService extends AbstractService<ICar> {
  constructor(domain: CarsODM) {
    super(domain, VehicleTypes.CAR);
  }
}