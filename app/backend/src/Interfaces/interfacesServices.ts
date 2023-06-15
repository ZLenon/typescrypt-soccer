import TeamsModel from '../database/models/TeamsModel';

// funções genericas

export interface ServiceTeams {
  allteamsModel(): Promise<TeamsModel[]>,
  findTeamIdModel(id: number): Promise<TeamsModel | null>,
}
