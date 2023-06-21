import ModelSequelize from '../database/models/MatchsModel'; // Model de Partidas
import ModelTimes from '../database/models/TeamsModel'; // Model de Times
import { FuncoesMatches } from '../Interfaces/interfacesServices';

class ModelMatchs implements FuncoesMatches {
  private modelM = ModelSequelize;
  private modeT = ModelTimes;

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
}

export default ModelMatchs;
