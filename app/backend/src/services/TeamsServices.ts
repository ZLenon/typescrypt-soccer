import { Iteams } from '../Interfaces/interfacesMigrations';
import { ServiceRes } from '../Interfaces/services';
import ModelTeams from '../models/TeamsModel';

class ServiceTeams {
  private model = new ModelTeams();

  public async allteamsService(): Promise<ServiceRes<Iteams[]>> {
    const allteams = await this.model.allteamsModel();
    return { type: 'SUCCESS', data: allteams };
  }

  public async findTeamIdService(id: number): Promise<ServiceRes<Iteams>> {
    const oneTeam = await this.model.findTeamIdModel(id);
    return { type: 'SUCCESS', data: oneTeam as Iteams };
  }
}

export default ServiceTeams;
