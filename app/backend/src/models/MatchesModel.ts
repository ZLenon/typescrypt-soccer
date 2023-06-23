import {
  IcreatedInProgress,
  Imatches,
  ImatchesUpdate,
} from '../Interfaces/interfacesMigrations';
import ModelSequelize from '../database/models/MatchsModel'; // Model de Partidas
import ModelTimes from '../database/models/TeamsModel'; // Model de Times
import { FuncoesMatches } from '../Interfaces/interfacesServices';

class ModelMatchs implements FuncoesMatches {
  private modelM = ModelSequelize;
  /* private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator, */

  async allMatcherModel(): Promise<ModelSequelize[]> {
    const todasPartidas = await this.modelM.findAll({
      include: [
        { model: ModelTimes, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: ModelTimes, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return todasPartidas;
  }

  async findQueryMatcherModel(query: boolean): Promise<ModelSequelize[]> {
    const partidaQuery = await this.modelM.findAll({
      include: [
        { model: ModelTimes, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: ModelTimes, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: query } });
    return partidaQuery;
  }

  async matcherENDModel(id: number): Promise<void> {
    await this.modelM.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async matcherUpdateModel(id: number, partida: ImatchesUpdate): Promise<void> {
    await this.modelM.update(
      { homeTeamGoals: partida.homeTeamGoals, awayTeamGoals: partida.awayTeamGoals },
      { where: { id } },
    );
  }

  async createMathInProgressModel(partida: IcreatedInProgress): Promise<Imatches> {
    const partidaEmProgresso = await this.modelM.create({
      ...partida,
      inProgress: true,
    });
    return partidaEmProgresso;
  }
}

export default ModelMatchs;
