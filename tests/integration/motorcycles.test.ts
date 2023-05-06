import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import chaiHttp from 'chai-http';

import { getAllMotocyclesResponse,
  newMotorcycleRequest, newMotorcycleResponse } from '../mocks/motors.mock';
import { app } from '../../src/app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /motorcycles:', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('1. Testa post na rota /motorcycles:', function () {
    it('1.1. Testa se retorna status 201 e a moto cadastrada com id:', async function () {
      sinon.stub(Model, 'create').resolves(newMotorcycleResponse);
      const httpRes = await chai.request(app).post('/motorcycles').send(newMotorcycleRequest);
      expect(httpRes.status).to.be.eq(201);
      expect(httpRes.body).to.be.deep.eq(newMotorcycleResponse);
    });
  });
  describe('2. Testa get na rota /motorcycles:', function () {
    it('2.1. Testa se retorna status 200 e todos as motos cadastradas:', async function () {
      sinon.stub(Model, 'find').resolves(getAllMotocyclesResponse);
      const httpRes = await chai.request(app).get('/motorcycles');
      expect(httpRes.status).to.be.eq(200);
      expect(httpRes.body).to.be.deep.eq(getAllMotocyclesResponse);
    });
  });
  describe('3. Testa get na rota /motorcycles:id :', function () {
    it('3.1. Testa se retorna status 200 e todos as motos cadastradas:', async function () {
      sinon.stub(Model, 'findById').resolves(getAllMotocyclesResponse[0]);
      const httpRes = await chai.request(app).get('/motorcycles/634852326b35b59438fbea2f');
      expect(httpRes.status).to.be.eq(200);
      expect(httpRes.body).to.be.deep.eq(getAllMotocyclesResponse[0]);
    });
    it('3.2. Testa se retorna status 404 e uma messagem de error not found:', async function () {
      sinon.stub(Model, 'findById').resolves();
      const httpRes = await chai.request(app).get('/motorcycles/634852326c35b59438fbea2f');
      expect(httpRes.status).to.be.eq(404);
      expect(httpRes.body.message).to.be.deep.eq('motorcycle not found');
    });
    it('3.3. Testa se retorna status 422 e error por conta do formato do id:', async function () {
      sinon.stub(Model, 'findById').resolves();
      const httpRes = await chai.request(app).get('/motorcycles/xxxxx');
      expect(httpRes.status).to.be.eq(422);
      expect(httpRes.body.message).to.be.deep.eq('Invalid mongo id');
    });
  });
  describe('4. Testa put na rota /motorcycles:id :', function () {
    it('4.1. Testa se retorna status 200 e moto com ano atualizado:', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves({
        ...newMotorcycleResponse,
        year: 2003,
      });
      const httpRes = await chai.request(app)
        .put('/motorcycles/6348513f34c397abcad040b2').send({
          ...newMotorcycleRequest,
          year: 2003,
        });
      expect(httpRes.status).to.be.eq(200);
      expect(httpRes.body).to.be.deep.eq({
        ...newMotorcycleResponse,
        year: 2003,
      });
    });
    it('4.2. Testa se retorna status 404 com error de motorcycle not found:', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      const httpRes = await chai.request(app)
        .put('/motorcycles/6348513f34d397abcad040b2').send({
          ...newMotorcycleRequest,
          year: 2003,
        });
      expect(httpRes.status).to.be.eq(404);
      expect(httpRes.body.message).to.be.deep.eq('motorcycle not found');
    });
    it('4.3. Testa se retorna status 422 com error de Invalid mongo id:', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      const httpRes = await chai.request(app)
        .put('/motorcycles/xxxxx').send({
          ...newMotorcycleRequest,
          year: 2003,
        });
      expect(httpRes.status).to.be.eq(422);
      expect(httpRes.body.message).to.be.deep.eq('Invalid mongo id');
    });
  });
});