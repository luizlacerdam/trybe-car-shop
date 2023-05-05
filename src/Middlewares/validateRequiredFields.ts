/* eslint-disable sonarjs/cognitive-complexity */
import { NextFunction, Request, Response } from 'express';
import MissingParamError from '../Erros/missingParam.error';

export default class ValidateRequiredFields {
  public static fields = {
    car: ['model', 'year', 'color', 'status', 'buyValue', 'doorsQty', 'seatsQty'],
    motorcycle: ['model', 'year', 'color', 'status', 'buyValue', 'category', 'engineCapacity'],
  };
  public static verifyRequiredFields = (key: keyof typeof this.fields) =>
    (req: Request, res: Response, next: NextFunction): Response | void => {
      const requiredFields = this.fields[key];
      for (let i = 0; i < requiredFields.length; i += 1) {
        if (!req.body[requiredFields[i]]) {
          throw new MissingParamError(`${requiredFields[i]} é obrigatório`);
        }
      }
      next();
    };
}