import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { newMotorcycleResponse } from '../../../mocks/motors.mock';
import MotocyclesService from '../../../../src/Services/motorcycles.service';

describe('Testa se recupera uma única moto pelo ID com sucesso:', function () {
  it('1. Testa getById service se retorna um único carro com sucesso:', async function () {
    sinon.stub(Model, 'findOne').resolves(newMotorcycleResponse);
    const service = new MotocyclesService();
    const result = await service.getById('6348513f34c397abcad040b2');
    expect(result).to.be.deep.equal(newMotorcycleResponse);
  });
  it('1. Testa getById service se retorna null com id aleatório:', async function () {
    sinon.stub(Model, 'findOne').resolves();
    const service = new MotocyclesService();
    const result = await service.getById('idaleatorio');
    expect(result).to.be.deep.equal(null);
  });
  afterEach(function () {
    sinon.restore();
  });
});