import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotocyclesService from '../../../../src/Services/motorcycles.service';
import { newMotorcycleRequest, newMotorcycleResponse } from '../../../mocks/motors.mock';

describe('Testa a criação de carros:', function () {
  it('1. Criando um novo carro com sucesso:', async function () {
    sinon.stub(Model, 'create').resolves(newMotorcycleResponse);
    const service = new MotocyclesService();
    const result = await service.addNewMotorcycle(newMotorcycleRequest);

    expect(result).to.be.deep.equal(newMotorcycleResponse);
  });
});