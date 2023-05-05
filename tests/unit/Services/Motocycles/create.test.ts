import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotocyclesService from '../../../../src/Services/motorcycles.service';
import { newMotorcycleRequest, newMotorcycleResponse } from '../../../mocks/motors.mock';
import MotorcyclesODM from '../../../../src/Models/MotorcyclesODM';
import VehiclesValidations from '../../../../src/Validations/vehicles.validations';

const motorcyclesODM = new MotorcyclesODM();
describe('Testa a criação de motos:', function () {
  it('1. Criando uma nova moto com sucesso:', async function () {
    sinon.stub(Model, 'create').resolves(newMotorcycleResponse);
    const service = new MotocyclesService(motorcyclesODM, VehiclesValidations);
    const result = await service.create(newMotorcycleRequest);

    expect(result).to.be.deep.equal(newMotorcycleResponse);
    sinon.restore();
  });
});