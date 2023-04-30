import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { newCarResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';

describe('Testa se recupera um único carro pelo ID com sucesso:', function () {
  it('1. Testa getById service se retorna um único carro com sucesso:', async function () {
    sinon.stub(Model, 'findOne').resolves(newCarResponse);
    const service = new CarsService();
    const result = await service.getById('6348513f34c397abcad040b2');
    expect(result).to.be.deep.equal(newCarResponse);
  });
  it('1. Testa getById service se retorna null com id aleatório:', async function () {
    sinon.stub(Model, 'findOne').resolves();
    const service = new CarsService();
    const result = await service.getById('idaleatorio');
    expect(result).to.be.deep.equal(null);
  });
  afterEach(function () {
    sinon.restore();
  });
});