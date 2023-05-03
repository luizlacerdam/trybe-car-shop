import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IService from '../Interfaces/IService';
import MotorcyclesODM from '../Models/MotorcyclesODM';

export default class MotocyclesService implements IService<IMotorcycle, Motorcycle> {
  private _domain: MotorcyclesODM;
  constructor(domain: MotorcyclesODM) {
    this._domain = domain;
  }
  private newDomain(vehicle: IMotorcycle | null): Motorcycle | null {
    if (vehicle) {
      return new Motorcycle(vehicle);
    }
    return null;
  }
  public async create(vehicle: IMotorcycle):Promise<Motorcycle | null> {
    const motorcyclesODM = this._domain;
    const newMoto = await motorcyclesODM.create(vehicle);
    return this.newDomain(newMoto);
  }

  public async getAll():Promise<(Motorcycle | null)[]> {
    const motorcyclesODM = this._domain;
    const motorcycles = await motorcyclesODM.find();    
    const motorcyclesArray = motorcycles.map((moto) => this.newDomain(moto));
    return motorcyclesArray;
  }

  public async getById(id: string):Promise<Motorcycle | null> {
    const motorcyclesODM = this._domain;
    const data = await motorcyclesODM.findById(id);
    if (!data) return null;
    return this.newDomain(data);
  }

  public async update(id: string, body: IMotorcycle): Promise<Motorcycle | null> {
    const motorcyclesODM = this._domain;
    const data = await motorcyclesODM.update(id, body);
    if (!data) return null;
    return this.newDomain(data);
  }
}