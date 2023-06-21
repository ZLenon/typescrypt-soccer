import { Request, Response } from 'express';
import MatchsSerice from '../services/MatchsService';

class ControllerMatchs {
  private service = new MatchsSerice();

  async allMatcherController(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) { // se a chave inProgress existir
      return this.findQueryMatcherController(req, res);
    }
    const partidas = await this.service.allMatcherService();
    return res.status(200).json(partidas.data);
  }

  async findQueryMatcherController(req: Request, res: Response) {
    const { inProgress } = req.query;
    // refatorado na mentoria da manha, é passando o inprogres no paramentro simula o IF
    const partidasEmProgresso = await this.service.findQueryMatcherModel(inProgress === 'true');
    return res.status(200).json(partidasEmProgresso.data);
  }
}

export default ControllerMatchs;
