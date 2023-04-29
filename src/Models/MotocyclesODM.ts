import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import IMotocycle from '../Interfaces/IMotocycle';

export default class MotocyclesODM extends AbstractODM<IMotocycle> {
  constructor() {
    const schema = new Schema<IMotocycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super('Motocycle', schema);
  }
  public async find(): Promise<IMotocycle[]> {
    return this.model.find();
  }
  public async findById(id: string): Promise<IMotocycle | null> {
    return this.model.findById(id);
  }

  public async updateMotocycle(id: string, body: IMotocycle): Promise<IMotocycle | null> {
    return this.model.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
  }
}