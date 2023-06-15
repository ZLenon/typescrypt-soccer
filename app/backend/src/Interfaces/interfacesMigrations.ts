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

interface Iusers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

export {
  Iteams,
  Imatches,
  Iusers,
};
