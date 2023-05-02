import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotocyclesService from '../../../../src/Services/motorcycles.service';
import { getAllMotocyclesResponse } from '../../../mocks/motors.mock';

describe('Testa se recupera todas as motos com sucesso:', function () {
  it('1. Testa getAll service se retorna todos as motos:', async function () {
    sinon.stub(Model, 'find').resolves(getAllMotocyclesResponse);
    const service = new MotocyclesService();
    const result = await service.getAll();
    expect(result).to.be.deep.equal(getAllMotocyclesResponse);
  });
});