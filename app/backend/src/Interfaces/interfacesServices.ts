import { JwtPayload } from 'jsonwebtoken';
import TeamsModel from '../database/models/TeamsModel';
import MatchsModel from '../database/models/MatchsModel';
import UserModel from '../database/models/UserModel';
import { ILogin, IRole,
  IcreatedInProgress, Imatches, ImatchesUpdate } from './interfacesMigrations';

// funções genericas

interface FuncoesTeams { // Times
  allteamsModel(): Promise<TeamsModel[]>,
  findTeamIdModel(id: number): Promise<TeamsModel | null>,
}

interface FuncoesLogin { // Usuario
  findUserModel(data: ILogin): Promise<UserModel | null>,
}

interface FuncoesMatches { // Partidas
  allMatcherModel(): Promise<MatchsModel[]>,
  findQueryMatcherModel(query: boolean): Promise<MatchsModel[]>,
  matcherENDModel(id: number): Promise<void>,
  matcherUpdateModel(id: number, partida: ImatchesUpdate): Promise<void>
  createMathInProgressModel(partida: IcreatedInProgress): Promise<Imatches>
}

interface FuncoesEncrypter { // Bcrypt
  passToHash(password: string): Promise<string>
  compareHash(password: string, hash: string): boolean
}

interface FuncoesToken { // JWT
  geradorToken(user: IRole): string
  // validateToken(token: string): boolean
  decodeToken(token: string):string | JwtPayload | null
}
export {
  FuncoesTeams,
  FuncoesLogin,
  FuncoesEncrypter,
  FuncoesToken,
  FuncoesMatches,
};
