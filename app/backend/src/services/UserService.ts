import Utils from '../middlewares/validEmailPass';
import { ILogin, Iusers } from '../Interfaces/interfacesMigrations';
import { ServiceRes } from '../Interfaces/services';
import ModelUser from '../models/UserModel';
import ServiceCryptografia from './bcryptService';
import TokenGeneratorJwt from './jwtService';
import UsersModel from '../database/models/UserModel';// so para acessar a propriedade datavalues

class ServiceUser {
  private model = new ModelUser();
  private jwt = new TokenGeneratorJwt();
  private bCrypt = new ServiceCryptografia();

  public async findUserService(data: ILogin): Promise<ServiceRes<Iusers | string>> {
    if (!data.email || !data.password) { // Todos os campos devem ser preenchidos
      return { type: 'CONFLICT', data: { message: 'All fields must be filled' } };
    }

    const validEmail = Utils.validEmail(data.email);
    const validSenha = Utils.validPassword(data.password);
    const usuario = await this.model.findUserModel(data) as UsersModel;
    if (!usuario) {
      return { type: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
    }
    const validHash = this.bCrypt.compareHash(data.password, usuario.dataValues.password);

    if (!validEmail || !validSenha || !validHash) { // E-mail ou senha inválidos
      return { type: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
    }
    const token = this.jwt.geradorToken({ role: usuario.role,
      id: usuario.id,
    });
    // console.log(token);
    return { type: 'SUCCESS', data: token };
  }
}

export default ServiceUser;
