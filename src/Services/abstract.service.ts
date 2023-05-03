import Car from '../Domains/Car';
// ICar => T // Interface
// Car => U  // Domain
// CarsODM => V // Model

export default class AbstractService<T, U, V> {
  private _domain: V;
  constructor(domain: V) {
    this._domain = domain;
  }
  private newVehicleDomain(vehicle: T | null): U | null {
    if (vehicle) {
      return new Car(vehicle);
    }
    return null;
  }

  public async create(vehicle: T) {
    const vehicleODM = this._domain;
    const newVehicle = await vehicleODM.create(vehicle);
    return this.newVehicleDomain(newVehicle);
  }
    
  public async getAll() {
    const vehicleODM = this._domain;
    const vehicles = await vehicleODM.find();    
    const vehiclesArray = vehicles.map((vehicle) => this.newVehicleDomain(vehicle));
    return vehiclesArray;
  }
    
  public async getById(id: string) {
    const vehicleODM = this._domain;
    const data = await vehicleODM.findById(id);
    if (!data) return null;
    return this.newVehicleDomain(data);
  }
    
  public async updateCarById(id: string, body: T) {
    const vehicleODM = this._domain;
    const data = await vehicleODM.update(id, body);
    if (!data) return null;
    return this.newVehicleDomain(data);
  }
}