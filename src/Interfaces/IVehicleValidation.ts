export default interface IVehicleValidation {
  validateExistVehicle<T>(type: string, vehicle: T): Error | void;
}