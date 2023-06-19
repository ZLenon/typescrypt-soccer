import ModelSequelize from '../database/models/TeamsModel'; // Model de Times
import { FuncoesTeams } from '../Interfaces/interfacesServices';

class ModelTeams implements FuncoesTeams {
  private model = ModelSequelize;
  /* private encrypter: Encrypter,
    private tokenGenerator: TokenGenerator, */

  async allteamsModel(): Promise<ModelSequelize[]> {
    const allteams = await this.model.findAll();
    return allteams;
  }

  async findTeamIdModel(id: number): Promise<ModelSequelize | null> {
    const findTeamId = await this.model.findOne({
      where: {
        id,
      },
    });
    return findTeamId;
  }
}

export default ModelTeams;
