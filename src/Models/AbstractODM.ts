import { Model, Schema, models, model } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected _schema: Schema;
  protected _modelName: string;
    
  constructor(schema: Schema, modelName: string) {
    this._schema = schema;
    this._modelName = modelName;
    this.model = models[this._modelName] || model(this._modelName, this._schema);
  }
}