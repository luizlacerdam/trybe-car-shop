import Vehicle from '../Domains/Vehicle';
import VehicleFactory from '../Domains/VehicleFactory';
import AbstractODM from '../Models/AbstractODM';

export default abstract class AbstractService<T> {
  protected _odm: AbstractODM<T>;
  private _type: string;

  constructor(odm: AbstractODM<T>, type:string) {
    this._odm = odm;
    this._type = type;
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

  public async getById(id: string):Promise<Vehicle | undefined | null> {
    const vehicle = await this._odm.findById(id);
    if (!vehicle) return null;
    return VehicleFactory.createDomain<T>(this._type, vehicle);
  }

  public async update(id: string, body: T): Promise<Vehicle | null | undefined> {
    const vehicle = await this._odm.update(id, body);
    if (!vehicle) return null;
    return VehicleFactory.createDomain<T>(this._type, vehicle);
  }
} 
