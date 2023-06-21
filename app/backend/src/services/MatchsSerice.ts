import { Imatches } from '../Interfaces/interfacesMigrations';
import { ServiceRes } from '../Interfaces/services';
import MatchsModel from '../models/MatchesModel';

class ServiceMatchs {
  private model = new MatchsModel();

  public async allMatcherService(): Promise<ServiceRes<Imatches[]>> {
    const todasPartidas = await this.model.allMatcherModel();
    return { type: 'SUCCESS', data: todasPartidas };
  }

  public async findQueryMatcherModel(query: boolean): Promise<ServiceRes<Imatches[]>> {
    const partidaEmProgresso = await this.model.findQueryMatcherModel(query);
    return { type: 'SUCCESS', data: partidaEmProgresso as Imatches[] };
  }
}

export default ServiceMatchs;
