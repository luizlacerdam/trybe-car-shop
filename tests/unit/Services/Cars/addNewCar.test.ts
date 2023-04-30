import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { newCarReq, newCarResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';

describe('Testa a criação de carros:', function () {
  it('1. Criando um novo carro com sucesso:', async function () {
    sinon.stub(Model, 'create').resolves(newCarResponse);
    const service = new CarsService();
    const result = await service.addNewCar(newCarReq);

    expect(result).to.be.deep.equal(newCarResponse);
  });
});