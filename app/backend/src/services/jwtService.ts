import * as jwt from 'jsonwebtoken';
import { IRole } from '../Interfaces/interfacesMigrations';
import { FuncoesToken } from '../Interfaces/interfacesServices';

class TokenGeneratorJwt implements FuncoesToken {
  private jwt = jwt;
  private secretKey = process.env.JWT_SECRET || 'jwt_secret' as string;
  private configjwt = {
    expiresIn: '100d',
    algorithm: 'HS256',
  } as jwt.SignOptions;

  geradorToken(user: IRole): string {
    const token = this.jwt.sign({ role: user.role, id: user.id }, this.secretKey, this.configjwt);
    return token;
  }

  // token = super string que é a gerada do password com o email
  /*  validateToken(token: jwt.JwtPayload): boolean {
    const isValid = this.jwt.verify(token, this.secretKey);
    return isValid;
  } */

  // decodifica a super string em um password
  decodeToken(token: string): string | jwt.JwtPayload | null {
    try {
      return this.jwt.verify(token, this.secretKey) as jwt.JwtPayload;
    } catch (error) {
      return null;
    }
  }
}

export default TokenGeneratorJwt;
