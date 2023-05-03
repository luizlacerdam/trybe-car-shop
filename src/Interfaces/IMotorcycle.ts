import IVehicle from './IVehicle';

export default interface IMotorcycle extends IVehicle {
  type: 'motocycle';
  category: 'Street' | 'Custom' | 'Trail';
  engineCapacity: number;
}
