import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { newCarReq, newCarResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';
import CarsODM from '../../../../src/Models/CarsODM';
import VehiclesValidations from '../../../../src/Validations/vehicles.validations';

const carsODM = new CarsODM();
describe('Testa a criação de carros:', function () {
  it('1. Criando um novo carro com sucesso:', async function () {
    sinon.stub(Model, 'create').resolves(newCarResponse);
    const service = new CarsService(carsODM, VehiclesValidations);
    const result = await service.create(newCarReq);

    expect(result).to.be.deep.equal(newCarResponse);
    sinon.restore();
  });
});