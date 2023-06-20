import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamsModel';
import { time } from '../tests/mock/mokes'

chai.use(chaiHttp);

import { expect } from 'chai';

describe('TESTES TEAMS', () => {

  afterEach(() => sinon.restore());

  it('Testando Buscar todos os Times', async () => {     
    sinon.stub(TeamModel, 'findAll').resolves([time] as TeamModel[]);

    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal([time]);
  });

  it('Testando Buscar apenas um Time', async () => {
    const timeModelo = time as TeamModel;
    sinon.stub(TeamModel, 'findOne').resolves(timeModelo);

    const result = await chai.request(app).get('/teams/20');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(timeModelo);
  });
});