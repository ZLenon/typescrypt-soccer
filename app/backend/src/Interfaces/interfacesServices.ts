import { JwtPayload } from 'jsonwebtoken';
import TeamsModel from '../database/models/TeamsModel';
import UserModel from '../database/models/UserModel';
import { ILogin, IRole } from './interfacesMigrations';
// funções genericas

interface FuncoesTeams {
  allteamsModel(): Promise<TeamsModel[]>,
  findTeamIdModel(id: number): Promise<TeamsModel | null>,
}

interface FuncoesLogin {
  findUserModel(data: ILogin): Promise<UserModel | null>,
}

interface FuncoesEncrypter {
  passToHash(password: string): Promise<string>
  compareHash(password: string, hash: string): boolean
}

interface FuncoesToken {
  geradorToken(user: IRole): string
  // validateToken(token: string): boolean
  decodeToken(token: string):string | JwtPayload
}
export {
  FuncoesTeams,
  FuncoesLogin,
  FuncoesEncrypter,
  FuncoesToken,
};
