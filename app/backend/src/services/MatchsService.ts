import { IcreatedInProgress, Imatches, ImatchesUpdate } from '../Interfaces/interfacesMigrations';
import { Msg, ServiceRes } from '../Interfaces/services';
import MatchsModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

class ServiceMatchs {
  private model = new MatchsModel();
  private times = new TeamsModel();

  public async findQueryMatcherModel(query: boolean): Promise<ServiceRes<Imatches[]>> {
    const partidaEmProgresso = await this.model.findQueryMatcherModel(query);
    return { type: 'SUCCESS', data: partidaEmProgresso as Imatches[] };
  }

  public async allMatcherService(): Promise<ServiceRes<Imatches[]>> {
    const todasPartidas = await this.model.allMatcherModel();
    return { type: 'SUCCESS', data: todasPartidas };
  }

  public async matcherENDService(id: number): Promise<Msg> {
    await this.model.matcherENDModel(id);
    return { message: 'Finished' };
  }

  public async matcherUpdateService(id: number, partida: ImatchesUpdate): Promise<ImatchesUpdate> {
    await this.model.matcherUpdateModel(id, partida);
    return {
      homeTeamGoals: partida.homeTeamGoals,
      awayTeamGoals: partida.awayTeamGoals,
    };
  }

  public async createMathInProgressService(partida: IcreatedInProgress):
  Promise<ServiceRes<Imatches>> {
    if (partida.homeTeamId === partida.awayTeamId) {
      return { type: 'CONFLICT',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const timesCasa = await this.times.findTeamIdModel(partida.homeTeamId);
    const vizitantes = await this.times.findTeamIdModel(partida.awayTeamId);
    if (!timesCasa || !vizitantes) {
      return { type: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const partidaEmProgresso = await this.model.createMathInProgressModel(partida);
    return { type: 'SUCCESS', data: partidaEmProgresso };
  }
}

export default ServiceMatchs;
