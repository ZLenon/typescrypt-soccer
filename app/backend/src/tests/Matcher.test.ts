import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// ----------Minhas importações---------------------------------------------
import DbModel from '../database/models/MatchsModel'; // DB
import TokenGeneratorJwt from '../services/jwtService'; // JWT

chai.use(chaiHttp);

import { expect } from 'chai';

describe('TESTES USER', () => {
  // --------------------STUBS---------------------------------------------
  afterEach(() => sinon.restore());
  // -------------------INSTANCIAS------------------------------------------
  const jwt = new TokenGeneratorJwt();
  // -----------------------MOCK-----------------------------------------
  const partidas = [{
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
   }];
   const body = { 
    req: { 
      headers: { authorization: '' },
      params: { id: 2 },
      body: { homeTeamGoals: 50, awayTeamGoals: 50 } 
      } }
   // ------------------------ROTAS-----------------------------------------
   it('Testando a rota TODAS Partidas em caso de SUCESSO', async () => {
    const DB = DbModel.bulkBuild(partidas) // DB --- allMatcherModel
    sinon.stub(DbModel, 'findAll').resolves(DB); // Model     

    const todasPartidas = await chai.request(app).get('/matches');
    // console.log('TESTE',todasPartidas.body);

    expect(todasPartidas.status).to.be.equal(200);
    expect(todasPartidas.body).to.be.deep.equal(partidas);
  });
  // -----------------------------------------------------------------------
  it('Testando a rota Partida em PROGRESSO em caso de SUCESSO', async () => {
    const DB = DbModel.bulkBuild(partidas) // DB --- findQueryMatcherModel
    sinon.stub(DbModel, 'findAll').resolves(DB); // Model     

    const todasPartidas = await chai.request(app).get('/matches')
    .query({ inProgress: 'true' })
    .send({ req: { query: { inProgress: 'true' } } });;
    // console.log('TESTE',todasPartidas.body);

    expect(todasPartidas.status).to.be.equal(200);
    expect(todasPartidas.body).to.be.deep.equal(partidas);
  });
  // -----------------------------------------------------------------------
  it('Testando a rota Finalizar Partida em PROGRESSO em caso de SUCESSO', async () => {
    sinon.stub(DbModel, 'update').resolves(); // Model --- matcherENDModel
    const TK = jwt.geradorToken({ role: 'visitante', id: 41 });
    const todasPartidas = await chai.request(app).patch('/matches/:id/finish')
    .set({authorization: TK})
    .send({ req: { params: { id: 1 } }, headers: { authorization: `${TK}` } });
    // console.log('TESTE',todasPartidas.body);

    expect(todasPartidas.status).to.be.equal(200);
    expect(todasPartidas.body).to.be.deep.equal({ message: 'Finished' });
  });
  // -----------------------------------------------------------------------
  it('Testando a rota Alterar Placar Partida em caso de SUCESSO', async () => {
    sinon.stub(DbModel, 'update').resolves(); // Model --- matcherUpdateModel
    const TK = jwt.geradorToken({ role: 'visitante', id: 41 });
    body.req.headers.authorization = TK;
    const todasPartidas = await chai.request(app).patch('/matches/:id')
    .set({authorization: TK})
    .send(body.req.body);
    // console.log('TESTE',todasPartidas.body);

    expect(todasPartidas.status).to.be.equal(200);
    expect(todasPartidas.body).to.be.deep.equal({ homeTeamGoals: 50, awayTeamGoals: 50 });    
  });
});