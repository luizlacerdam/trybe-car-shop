import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { allCarsResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';
import CarsODM from '../../../../src/Models/CarsODM';
import VehiclesValidations from '../../../../src/Validations/vehicles.validations';

const carsODM = new CarsODM();
describe('Testa a atualização de carros:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('1. Testa se é possível atualizar carros com updateCarById:', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(allCarsResponse[1]);
    const service = new CarsService(carsODM, VehiclesValidations);
    const result = await service.update('634852326b35b59438fbea2f', allCarsResponse[1]);
    expect(result).to.be.deep.equal(allCarsResponse[1]);
  });
  it('2. Testa updateCarById service se retorna error com id aleatório:', async function () {
    try {
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      const service = new CarsService(carsODM, VehiclesValidations);
      await service.update('idaleatorio', allCarsResponse[1]);
    } catch (error) {
      expect((error as Error).message).to.equal('car not found');
    }
  });
});
