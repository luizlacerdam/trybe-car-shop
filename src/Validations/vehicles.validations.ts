import NotFound from '../Erros/notFound.error';
import IVehicle from '../Interfaces/IVehicle';

export default class VehiclesValidations {
  public validateExistVehicle(type: string, vehicle: IVehicle) {
    if (!vehicle) throw new NotFound(`${type} not found`);
  }
}