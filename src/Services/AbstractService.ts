import Vehicle from '../Domains/Vehicle';
import VehicleFactory from '../Domains/VehicleFactory';
import IVehicleValidation from '../Interfaces/IVehicleValidation';
import AbstractODM from '../Models/AbstractODM';

export default abstract class AbstractService<T> {
  protected _odm: AbstractODM<T>;
  private _type: string;
  private _validation: IVehicleValidation;

  constructor(odm: AbstractODM<T>, type:string, validation: IVehicleValidation) {
    this._odm = odm;
    this._type = type;
    this._validation = validation;
  }
  // underfined or null?
  public async create(vehicle: T):Promise<Vehicle | undefined> {
    const newDomain = VehicleFactory.createDomain<T>(this._type, vehicle);
    const newVehicle = await this._odm.create(newDomain as unknown as T);
    return VehicleFactory.createDomain<T>(this._type, newVehicle);
  }

  public async getAll():Promise<(Vehicle | undefined)[]> {
    const vehicles = await this._odm.find();    
    const vehiclesArray = vehicles.map((vehicle) =>
      VehicleFactory.createDomain<T>(this._type, vehicle));
    return vehiclesArray;
  }

  public async getById(id: string):Promise<Vehicle | undefined> {
    const vehicle = await this._odm.findById(id);
    this._validation.validateExistVehicle<T>(this._type, vehicle as T);
    return VehicleFactory.createDomain<T>(this._type, vehicle as T);
  }

  public async update(id: string, body: T): Promise<Vehicle | null | undefined> {
    const vehicle = await this._odm.update(id, body);
    this._validation.validateExistVehicle<T>(this._type, vehicle as T);
    return VehicleFactory.createDomain<T>(this._type, vehicle as T);
  }
} 
