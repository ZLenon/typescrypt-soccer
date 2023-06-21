import ModelSequelize from '../database/models/MatchsModel'; // Model de Partidas
import { FuncoesMatches } from '../Interfaces/interfacesServices';

class ModelMatchs implements FuncoesMatches {
  private model = ModelSequelize;
  /* private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator, */

  async allMatcherModel(): Promise<ModelSequelize[]> {
    const todasPartidas = await this.model.findAll();
    return todasPartidas;
  }

  async findQueryMatcherModel(query: boolean): Promise<ModelSequelize[]> {
    const partidaQuery = await this.model.findAll({
      where: {
        inProgress: query,
      },
    });
    return partidaQuery;
  }
}

export default ModelMatchs;
