import ModelPartidas from '../database/models/MatchsModel'; // Model de Partidas
import ModelTimes from '../database/models/TeamsModel'; // Model de Times
import { ILeaderBoard } from '../Interfaces/interfacesMigrations';
// import { FuncoesMatches } from '../Interfaces/interfacesServices';

class ModelLeaderboard {
  private modelM = ModelPartidas;
  private modelT = ModelTimes;
  private pontosTotais = 0;
  private jogosTotais = 0;
  private vitoriasTotais = 0;
  private empateTotais = 0;
  private derrotasTotais = 0;
  private golsTotaisFeitos = 0;
  private golsTotaisRecebidos = 0;
  private eficiencia = 0;// req 24
  private balancoGols = 0;// req 24
  // --------------------------------------------------------------------
  calculaPontosTotais(partidas: ModelPartidas[], idTime: number): number {
    /*
    Para calcular o Total de Pontos, você deve levar em consideração que:
    O time vitorioso: marcará +3 pontos;
    O time perdedor: marcará 0 pontos;
    Em caso de empate: ambos os times marcam +1 ponto.
    */
    this.pontosTotais = 0;
    partidas.forEach((info) => {
      if (info.homeTeamId === idTime && info.homeTeamGoals > info.awayTeamGoals) {
        this.pontosTotais += 3;
      }
      if (info.homeTeamId === idTime && info.homeTeamGoals === info.awayTeamGoals) {
        this.pontosTotais += 1;
      }
    });
    return this.pontosTotais;
  }

  // --------------------------------------------------------------------
  calculaTodosOsJogos(partidas: ModelPartidas[], idTime: number): number {
    this.jogosTotais = 0;
    partidas.forEach((info) => {
      if (info.homeTeamId === idTime) {
        this.jogosTotais += 1;
      }
    });
    return this.jogosTotais;
  }

  // --------------------------------------------------------------------
  calculaVitorias(partidas: ModelPartidas[], idTime: number): number {
    this.vitoriasTotais = 0;
    partidas.forEach((info) => {
      if (info.homeTeamId === idTime && info.homeTeamGoals > info.awayTeamGoals) {
        this.vitoriasTotais += 1;
      }
    });
    return this.vitoriasTotais;
  }

  // --------------------------------------------------------------------
  calculaEmpates(partidas: ModelPartidas[], idTime: number): number {
    this.empateTotais = 0;
    partidas.forEach((info) => {
      if (info.homeTeamId === idTime && info.homeTeamGoals === info.awayTeamGoals) {
        this.empateTotais += 1;
      }
    });
    return this.empateTotais;
  }

  // --------------------------------------------------------------------
  calculaDerrotas(partidas: ModelPartidas[], idTime: number): number {
    this.derrotasTotais = 0;
    partidas.forEach((info) => {
      if (info.homeTeamId === idTime && info.homeTeamGoals < info.awayTeamGoals) {
        this.derrotasTotais += 1;
      }
    });
    return this.derrotasTotais;
  }

  // --------------------------------------------------------------------
  calculaGolsFeitos(partidas: ModelPartidas[], idTime: number): number {
    this.golsTotaisFeitos = 0;
    partidas.forEach((info) => {
      if (info.homeTeamId === idTime) {
        this.golsTotaisFeitos += info.homeTeamGoals;
      }
    });
    return this.golsTotaisFeitos;
  }

  // --------------------------------------------------------------------
  calculaGolsRecebidos(partodas: ModelPartidas[], idTimes: number): number {
    this.golsTotaisRecebidos = 0;
    partodas.forEach((info) => {
      if (info.homeTeamId === idTimes) this.golsTotaisRecebidos += info.awayTeamGoals;
    });
    return this.golsTotaisRecebidos;
  }

  // --------------------------------------------------------------------
  calculaEficiencia(): number { // Req 24
    /*
    Para o campo Aproveitamento do time (%), que é a porcentagem de jogos ganhos,
    use a seguinte fórmula: [P / (J * 3)] * 100, onde:
    P: Total de Pontos;
    J: Total de Jogos.
    Obs.: O seu resultado deverá ser limitado a duas casas decimais.
    */
    this.eficiencia = Number(((this.pontosTotais / (this.jogosTotais * 3)) * 100).toPrecision(4));
    return this.eficiencia;
  }

  // --------------------------------------------------------------------
  calculaBalancoDeGols(): number { // Req 24  Saldo de gols
    /*
    Para calcular Saldo de Gols use a seguinte fórmula: GP - GC, onde:
    GP: Gols marcados a favor;
    GC: Gols sofridos.
    */
    this.balancoGols = this.golsTotaisFeitos - this.golsTotaisRecebidos;
    return this.balancoGols;
  }

  // --------------------------------------------------------------------
  static ordenaTimes(partidas: ILeaderBoard[]): ILeaderBoard[] { // Req 24
    /*
    O resultado deverá ser ordenado sempre de forma decrescente,
    levando em consideração a quantidade de pontos que o time acumulou.
    Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:
    Ordem para desempate
    1º Total de Vitórias;
    2º Saldo de gols;
    3º Gols a favor;
    */
    partidas.sort((a, z) =>
      z.totalPoints - a.totalPoints
      || z.totalVictories - a.totalVictories
      || z.goalsBalance - a.goalsBalance
      || z.goalsFavor - a.goalsFavor
      || z.goalsOwn - a.goalsOwn);
    return partidas;
  }

  // --------------------------------------------------------------------
  async retornoFinalLeaderboard(): Promise<ILeaderBoard[]> {
    /*
    Por padrão, as respostas de todos os seus endpoints deverão estar em inglês,
    mesmo que a renderização no front-end seja em português.
    A sua tabela deverá renderizar somente as PARTIDAS que já foram FINALIZADAS! "inProgress = false"
    */
    const times = await this.modelT.findAll();
    const partidas = await this.modelM.findAll({ where: { inProgress: false } });
    const leaderboard = times.map((time) => ({
      name: time.teamName,
      totalPoints: this.calculaPontosTotais(partidas, time.id),
      totalGames: this.calculaTodosOsJogos(partidas, time.id),
      totalVictories: this.calculaVitorias(partidas, time.id),
      totalDraws: this.calculaEmpates(partidas, time.id),
      totalLosses: this.calculaDerrotas(partidas, time.id),
      goalsFavor: this.calculaGolsFeitos(partidas, time.id),
      goalsOwn: this.calculaGolsRecebidos(partidas, time.id),
      efficiency: this.calculaEficiencia(),
      goalsBalance: this.calculaBalancoDeGols(),
    }));

    return leaderboard;
  }
}

export default ModelLeaderboard;
