import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import chaiHttp from 'chai-http';
// import chaiHttp = require('chai-http');
import { allCarsResponse, newCarReq, newCarResponse } from '../mocks/cars.mock';
import { app } from '../../src/app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /cars:', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('1. Testa post na rota /cars:', function () {
    it('1.1. Testa se retorna status 201 e o carro cadastrado com id:', async function () {
      sinon.stub(Model, 'create').resolves(newCarResponse);
      const httpRes = await chai.request(app).post('/cars').send(newCarReq);
      expect(httpRes.status).to.be.eq(201);
      expect(httpRes.body).to.be.deep.eq(newCarResponse);
    });
  });
  describe('2. Testa get na rota /cars:', function () {
    it('2.1. Testa se retorna status 200 e todos os carros cadastrados:', async function () {
      sinon.stub(Model, 'find').resolves(allCarsResponse);
      const httpRes = await chai.request(app).get('/cars');
      expect(httpRes.status).to.be.eq(200);
      expect(httpRes.body).to.be.deep.eq(allCarsResponse);
    });
  });
  describe('3. Testa get na rota /cars:id :', function () {
    it('3.1. Testa se retorna status 200 e todos os carros cadastrados:', async function () {
      sinon.stub(Model, 'findById').resolves(allCarsResponse[0]);
      const httpRes = await chai.request(app).get('/cars/634852326b35b59438fbea2f');
      expect(httpRes.status).to.be.eq(200);
      expect(httpRes.body).to.be.deep.eq(allCarsResponse[0]);
    });
    it('3.2. Testa se retorna status 404 e uma messagem de error not found:', async function () {
      sinon.stub(Model, 'findById').resolves();
      const httpRes = await chai.request(app).get('/cars/634852326c35b59438fbea2f');
      expect(httpRes.status).to.be.eq(404);
      expect(httpRes.body.message).to.be.deep.eq('car not found');
    });
    it('3.3. Testa se retorna status 422 e error por conta do formato do id:', async function () {
      sinon.stub(Model, 'findById').resolves();
      const httpRes = await chai.request(app).get('/cars/xxxxx');
      expect(httpRes.status).to.be.eq(422);
      expect(httpRes.body.message).to.be.deep.eq('Invalid mongo id');
    });
  });
  describe('4. Testa put na rota /cars:id :', function () {
    it('4.1. Testa se retorna status 200 e carro com ano atualizado:', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves({
        ...newCarResponse,
        year: 2003,
      });
      const httpRes = await chai.request(app)
        .put('/cars/6348513f34c397abcad040b2').send({
          ...newCarReq,
          year: 2003,
        });
      expect(httpRes.status).to.be.eq(200);
      expect(httpRes.body).to.be.deep.eq({
        ...newCarResponse,
        year: 2003,
      });
    });
    it('4.2. Testa se retorna status 404 com error de car not found:', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      const httpRes = await chai.request(app)
        .put('/cars/6348513f34d397abcad040b2').send({
          ...newCarReq,
          year: 2003,
        });
      expect(httpRes.status).to.be.eq(404);
      expect(httpRes.body.message).to.be.deep.eq('car not found');
    });
    it('4.3. Testa se retorna status 422 com error de Invalid mongo id:', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves();
      const httpRes = await chai.request(app)
        .put('/cars/xxxxx').send({
          ...newCarReq,
          year: 2003,
        });
      expect(httpRes.status).to.be.eq(422);
      expect(httpRes.body.message).to.be.deep.eq('Invalid mongo id');
    });
  });
});