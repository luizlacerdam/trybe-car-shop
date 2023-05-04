import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { allCarsResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';
import CarsODM from '../../../../src/Models/CarsODM';

const carsODM = new CarsODM();
describe('Testa se recupera todos os carros com sucesso:', function () {
  it('1. Testa getAll service se retorna todos os carros:', async function () {
    sinon.stub(Model, 'find').resolves(allCarsResponse);
    const service = new CarsService(carsODM);
    const result = await service.getAll();
    expect(result).to.be.deep.equal(allCarsResponse);
    sinon.restore();
  });
});