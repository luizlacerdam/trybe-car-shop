import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { newCarResponse } from '../../../mocks/cars.mock';
import CarsService from '../../../../src/Services/cars.service';
import CarsODM from '../../../../src/Models/CarsODM';
import VehiclesValidations from '../../../../src/Validations/vehicles.validations';

const carsODM = new CarsODM();
describe('Testa se recupera um único carro pelo ID com sucesso:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('1. Testa getById service se retorna um único carro com sucesso:', async function () {
    sinon.stub(Model, 'findOne').resolves(newCarResponse);
    const service = new CarsService(carsODM, VehiclesValidations);
    const result = await service.getById('6348513f34c397abcad040b2');
    expect(result).to.be.deep.equal(newCarResponse);
  });
  it('2. Testa getById service se retorna error com id aleatório:', async function () {
    sinon.stub(Model, 'findOne').resolves();
    try {
      const service = new CarsService(carsODM, VehiclesValidations);
      await service.getById('63319d80feb9f483ee823ac5');
    } catch (error) {
      expect((error as Error).message).to.equal('car not found');
    }
  });
  it('3. Testa getById service se retorna null com id aleatório:', async function () {
    sinon.stub(Model, 'findOne').throws(new Error('Invalid Mongo id'));
    try {
      const service = new CarsService(carsODM, VehiclesValidations);
      await service.getById('xxxxxx');
    } catch (error) {
      expect((error as Error).message).to.equal('Invalid Mongo id');
    }
  });
});