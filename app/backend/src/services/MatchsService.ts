import { Imatches } from '../Interfaces/interfacesMigrations';
import { Msg, ServiceRes } from '../Interfaces/services';
import MatchsModel from '../models/MatchesModel';

class ServiceMatchs {
  private model = new MatchsModel();

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
}

export default ServiceMatchs;
