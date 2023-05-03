import { Model, Schema, models, model, UpdateQuery } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected _schema: Schema;
  protected _modelName: string;
    
  constructor(modelName: string, schema: Schema) {
    this._schema = schema;
    this._modelName = modelName;
    this.model = models[this._modelName] || model(this._modelName, this._schema);
  }
  
  public async create(obj: T):Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }
  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, body: T): Promise<T | null> {
    return this.model.findByIdAndUpdate({ _id: id }, { ...body } as UpdateQuery<T>, { new: true });
  }
}