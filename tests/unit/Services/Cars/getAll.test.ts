import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { allCarsResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';

describe('Testa se recupera todos os carros com sucesso:', function () {
  it('1. Testa getAll service se retorna todos os carros:', async function () {
    sinon.stub(Model, 'find').resolves(allCarsResponse);
    const service = new CarsService();
    const result = await service.getAll();
    expect(result).to.be.deep.equal(allCarsResponse);
  });
});