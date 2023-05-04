import NotFound from '../Erros/notFound.error';

export default class VehiclesValidations {
  public static validateExistVehicle<T>(type: string, vehicle: T) {
    if (!vehicle) throw new NotFound(`${type} not found`);
  }
}