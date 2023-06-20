import * as sinon from 'sinon';
import * as chai from 'chai';
import { Request, Response } from 'express';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// ----------Minhas importações---------------------------------------------
import DbModel from '../database/models/UserModel'; // DB
import UsuarioModel from '../models/UserModel'; // Model
import UsuarioService from '../services/UserService'; // Service
import UsuarioController from '../controllers/UserController'; // Controller
import { ILogin, Iusers } from '../Interfaces/interfacesMigrations'; // Interfaces
import ServiceCryptografia from '../services/bcryptService'; // ByCrpt
import TokenGeneratorJwt from '../services/jwtService'; // JWT

chai.use(chaiHttp);

import { expect } from 'chai';

describe('TESTES USER', () => {
  // --------------------STUBS---------------------------------------------
  const request: Request = {} as Request;
  const response: Response = {} as Response;    
  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);    
  });
  afterEach(() => sinon.restore());
  // -------------------INSTANCIAS------------------------------------------
  const funcModel = new UsuarioModel();
  const funcService = new UsuarioService();
  const jwt = new TokenGeneratorJwt();
  const bcrypt = new ServiceCryptografia();
  // -----------------------MOCK-----------------------------------------
  const user = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'       
  }
  const reqBody = {
    email: "admin@admin.com",
    password: "secret_admin"
  }
  // -------------------------MODEL------------------------------------------
  it('Testando findUserModel', async () => {   
    const info = reqBody as ILogin;  
    const DB = DbModel.build(user)
    sinon.stub(DbModel, 'findOne').resolves(DB);

    const usuario = await funcModel.findUserModel(info);
    // console.log('Aqui',usuario?.dataValues);
    expect(usuario?.dataValues).to.deep.equal(user);
  });
  // ------------------------SERVICE------------------------------------------
  it('Testando findUserService caso de SUCESSO', async () => {   
    const info = reqBody as ILogin;  
    const DB = DbModel.build(user)
    sinon.stub(DbModel, 'findOne').resolves(DB);

    const usuario = await funcService.findUserService(info);
    // console.log('Aqui',usuario);
    expect(usuario.type).to.equal('SUCCESS');
    expect(typeof usuario.data).to.be.a('string');// token
  });
   // ------------------------------------------------------------------------
   it('Testando findUserService caso de FALHA/ email e senha Errados', async () => {   
    const info = reqBody as ILogin;  
    info.email = 'email@errado.com'// atribuindo um email errado
    info.password = "123456" // attribuindo uma senha errada
    const DB = DbModel.build(user)
    sinon.stub(DbModel, 'findOne').resolves(DB);
 
    const usuario = await funcService.findUserService(info);
    // console.log('Aqui',usuario);
    expect(usuario.type).to.equal('NOT_FOUND');
    expect(usuario.data).to.deep.equal({ message: 'Invalid email or password' });
  });
  // ------------------------------------------------------------------------
  it('Testando findUserService caso de FALHA/ DB não retorna o usuario', async () => {   
    const info = reqBody as ILogin;  
    
    sinon.stub(DbModel, 'findOne').resolves(null); // Resposta do banco, não encontrando usuario
 
    const usuario = await funcService.findUserService(info);
    // console.log('Aqui',usuario);
    expect(usuario.type).to.equal('NOT_FOUND');
    expect(usuario.data).to.deep.equal({ message: 'Invalid email or password' });
  });
    // ------------------------------------------------------------------------
    it('Testando findUserService caso de FALHA/ email e senha não passados', async () => {   
      const info = reqBody as ILogin;  
      info.email = undefined;// atribuindo um email indefinido
      info.password = undefined; // attribuindo uma senha indefinido
      const DB = DbModel.build(user)
      sinon.stub(DbModel, 'findOne').resolves(DB);
   
      const usuario = await funcService.findUserService(info);
      // console.log('Aqui',usuario);
      expect(usuario.type).to.equal('CONFLICT');
      expect(usuario.data).to.deep.equal({ message: 'All fields must be filled' });
    });
  // ------------------------CONTROLLER------------------------------------------
    /*  it('Testando findUserController caso de SUCESSO', async () => {     
      request.body = reqBody as ILogin;  // email e password
    
      const DB = DbModel.build(user)
      sinon.stub(DbModel, 'findOne').resolves(DB);
   
      await funcController.findUserController(request, response);
      
      expect(response.status).to.have.been.calledWith(200);
      expect(response.json).to.have.been.calledWithExactly();
    }); */
    // ------------------------ROTA------------------------------------------
    it('Testando a rota Login em caso de SUCESSO', async () => {
      const DB = DbModel.build(user) // DB
      sinon.stub(DbModel, 'findOne').resolves(DB); // Model     
      sinon.stub(bcrypt, 'compareHash').resolves(true); 

      const usuario = await chai.request(app).post('/login').send({ // Não aceita mock
        email: "admin@admin.com",
        password: "secret_admin"
      });
      // console.log('TESTE',usuario.body);

      expect(usuario.status).to.be.equal(200);
      expect(usuario.body).to.haveOwnProperty('token');
    });
    // ------------------------------------------------------------------------
    it('Testando a rota Login em caso de FALHA/ email e senha não passados', async () => {
      const DB = DbModel.build(user) // DB
      sinon.stub(DbModel, 'findOne').resolves(DB); // Model     
      sinon.stub(bcrypt, 'compareHash').resolves(true); 

      const usuario = await chai.request(app).post('/login').send({// Não aceita mock
        email: undefined,
        password: undefined
      });
      // console.log('TESTE',usuario.body);
      
      expect(usuario.status).to.be.equal(400);
      expect(usuario.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    // ------------------------------------------------------------------------
    it('Testando a rota Login em caso de FALHA/ email e senha Errados', async () => {
      const DB = DbModel.build(user) // DB
      sinon.stub(DbModel, 'findOne').resolves(DB); // Model     
      sinon.stub(bcrypt, 'compareHash').resolves(false); 

      const usuario = await chai.request(app).post('/login').send({// Não aceita mock
        email: "emailerrado@test.com",
        password: 'Senha-errada'
      });
      // console.log('TESTE',usuario.body);
      
      expect(usuario.status).to.be.equal(401);
      expect(usuario.body).to.deep.equal({ message: 'Invalid email or password' });
    });
    // ------------------------------------------------------------------------
    it('Testando a rota Login em caso de FALHA/ sem token', async () => {
         
      sinon.stub(jwt, 'decodeToken').resolves('stringbemcompridageradapelojwt'); 

      const usuario = await chai.request(app).get('/login/role').send({// Não aceita mock
        Authorization: undefined
      });
      // console.log('TESTE',usuario.body);
      
      expect(usuario.status).to.be.equal(401);
      expect(usuario.body).to.deep.equal({ message: 'Token not found' });
    });
});