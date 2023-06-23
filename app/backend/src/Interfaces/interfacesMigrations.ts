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

export {
  Iteams,
  Imatches,
  Iusers,
  ILogin,
  IRole,
  ImatchesUpdate,
};
