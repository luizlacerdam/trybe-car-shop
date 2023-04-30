// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import { Model } from 'mongoose';
// import chaiHttp = require('chai-http');
// import app from '../../src/app';
// import { newCarReq, newCarResponse } from './mocks/cars.mock';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Testa a rota /cars:', function () {
//   describe('1. Testa post na rota /cars:', function () {
//     it('1.1. Testa se retorna status 201', async function () {
//       sinon.stub(Model, 'create').resolves(newCarResponse);
//       const httpRes = await chai.request(app).post('/cars').send(newCarReq);
//       expect(httpRes.body).to.be.deep.eq(newCarResponse);
//     });
//   });
// });