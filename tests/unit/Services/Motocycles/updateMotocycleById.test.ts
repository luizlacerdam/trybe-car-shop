import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { getAllMotocyclesResponse } from '../../../mocks/motors.mock';
import MotocyclesService from '../../../../src/Services/motorcycles.service';

describe('Testa a atualização de motos:', function () {
  it('1. Testa se é possível atualizar motos com updateCarById:', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(getAllMotocyclesResponse[1]);
    const service = new MotocyclesService();
    const result = await service
      .updateMotoById('634852326b35b59438fbea2f', getAllMotocyclesResponse[1]);
    expect(result).to.be.deep.equal(getAllMotocyclesResponse[1]);
  });
  it('1. Testa updateMotoById service se retorna null com id aleatório:', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
    const service = new MotocyclesService();
    const result = await service.updateMotoById('idaleatorio', getAllMotocyclesResponse[1]);
    expect(result).to.be.deep.equal(null);
  });
  afterEach(function () {
    sinon.restore();
  });
});