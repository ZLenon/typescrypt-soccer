import * as bcrypt from 'bcryptjs';
import { FuncoesEncrypter } from '../Interfaces/interfacesServices';

class ServiceCryptografia implements FuncoesEncrypter {
  private bcrypt = bcrypt;

  async passToHash(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(password, 10);
    return hash; // String com varios caracteres
  }

  compareHash(password: string, hash: string): boolean {
    const isValid = this.bcrypt.compareSync(password, hash);
    return isValid;
  }
}

export default ServiceCryptografia;
