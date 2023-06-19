import { ILogin } from '../Interfaces/interfacesMigrations';
import UserModel from '../database/models/UserModel'; // Model de User
import { FuncoesLogin } from '../Interfaces/interfacesServices';

class ModelUser implements FuncoesLogin {
  private model = UserModel;

  async findUserModel(data: ILogin): Promise<UserModel | null> {
    const usuario = await this.model.findOne({
      where: {
        email: data.email,
      } });
    return usuario;
  }
}

export default ModelUser;
