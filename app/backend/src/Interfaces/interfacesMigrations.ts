interface Iteams {
  id: number,
  teamName: string,
}

interface Imatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}
interface ImatchesUpdate {
  homeTeamGoals: number,
  awayTeamGoals: number
}

interface IcreatedInProgress {
  homeTeamId: number, // O valor deve ser o id do time
  awayTeamId: number, // O valor deve ser o id do time
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface Iusers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

interface ILogin {
  email: string | undefined,
  password: string | undefined,
}
interface IRole {
  role: string | undefined,
  id: number | undefined,
}

interface ILeaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  efficiency: number,
  goalsBalance: number,
}

export {
  Iteams,
  Imatches,
  Iusers,
  ILogin,
  IRole,
  ImatchesUpdate,
  IcreatedInProgress,
  ILeaderBoard,
};
