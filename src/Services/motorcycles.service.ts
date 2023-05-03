import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';

export default class MotocyclesService {
  private newMotorcycleDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }
  public async addNewMotorcycle(moto: IMotorcycle) {
    const motorcyclesODM = new MotorcyclesODM();
    const newMoto = await motorcyclesODM.create(moto);
    return this.newMotorcycleDomain(newMoto);
  }

  public async getAll() {
    const motorcyclesODM = new MotorcyclesODM();
    const motorcycles = await motorcyclesODM.find();    
    const motorcyclesArray = motorcycles.map((moto) => this.newMotorcycleDomain(moto));
    return motorcyclesArray;
  }

  public async getById(id: string) {
    const motorcyclesODM = new MotorcyclesODM();
    const data = await motorcyclesODM.findById(id);
    if (!data) return null;
    return this.newMotorcycleDomain(data);
  }

  public async updateMotoById(id: string, body: IMotorcycle) {
    const motorcyclesODM = new MotorcyclesODM();
    const data = await motorcyclesODM.update(id, body);
    if (!data) return null;
    return this.newMotorcycleDomain(data);
  }
}