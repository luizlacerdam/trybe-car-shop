import Motocycle from '../Domains/Motocycle';
import IMotocycle from '../Interfaces/IMotocycle';
import MotocyclesODM from '../Models/MotocyclesODM';

export default class MotocyclesService {
  private newMotocycleDomain(car: IMotocycle | null): Motocycle | null {
    if (car) {
      return new Motocycle(car);
    }
    return null;
  }
  public async addNewMotocycle(moto: IMotocycle) {
    const motocyclesODM = new MotocyclesODM();
    const newMoto = await motocyclesODM.create(moto);
    return this.newMotocycleDomain(newMoto);
  }

  public async getAll() {
    const motocyclesODM = new MotocyclesODM();
    const motocycles = await motocyclesODM.find();    
    const motocyclesArray = motocycles.map((moto) => this.newMotocycleDomain(moto));
    return motocyclesArray;
  }

  public async getById(id: string) {
    const motocyclesODM = new MotocyclesODM();
    const data = await motocyclesODM.findById(id);
    if (!data) return null;
    return this.newMotocycleDomain(data);
  }

  public async updateMotoById(id: string, body: IMotocycle) {
    const motocyclesODM = new MotocyclesODM();
    const data = await motocyclesODM.updateMotocycle(id, body);
    if (!data) return null;
    return this.newMotocycleDomain(data);
  }
}