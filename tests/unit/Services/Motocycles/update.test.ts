import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { getAllMotocyclesResponse } from '../../../mocks/motors.mock';
import MotocyclesService from '../../../../src/Services/motorcycles.service';
import MotorcyclesODM from '../../../../src/Models/MotorcyclesODM';

const motorcyclesODM = new MotorcyclesODM();
describe('Testa a atualização de motos:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('1. Testa se é possível atualizar motos com updateCarById:', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(getAllMotocyclesResponse[1]);
    const service = new MotocyclesService(motorcyclesODM);
    const result = await service
      .update('634852326b35b59438fbea2f', getAllMotocyclesResponse[1]);
    expect(result).to.be.deep.equal(getAllMotocyclesResponse[1]);
  });
  it('3. Testa updateMotoById service se retorna null com id aleatório:', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves();
    const service = new MotocyclesService(motorcyclesODM);
    const result = await service.update('idaleatorio', getAllMotocyclesResponse[1]);
    expect(result).to.be.deep.equal(null);
  });
});