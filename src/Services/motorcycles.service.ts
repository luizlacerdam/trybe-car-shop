import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';

export default class MotocyclesService {
  private newMotorcycleDomain(car: IMotorcycle | null): Motorcycle | null {
    if (car) {
      return new Motorcycle(car);
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
    const data = await motorcyclesODM.updateMotorcycle(id, body);
    if (!data) return null;
    return this.newMotorcycleDomain(data);
  }
}