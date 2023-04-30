import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { allCarsResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';

describe('Testa a atualização de carros:', function () {
  it('1. Testa se é possível atualizar carros com updateCarById:', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(allCarsResponse[1]);
    const service = new CarsService();
    const result = await service.updateCarById('634852326b35b59438fbea2f', allCarsResponse[1]);
    expect(result).to.be.deep.equal(allCarsResponse[1]);
  });
  it('1. Testa updateCarById service se retorna null com id aleatório:', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
    const service = new CarsService();
    const result = await service.updateCarById('idaleatorio', allCarsResponse[1]);
    expect(result).to.be.deep.equal(null);
  });
  afterEach(function () {
    sinon.restore();
  });
});