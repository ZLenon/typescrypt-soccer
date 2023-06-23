import { Request, Response } from 'express';
import TokenGeneratorJwt from '../services/jwtService';
import MatchsSerice from '../services/MatchsService';

class ControllerMatchs {
  private service = new MatchsSerice();
  private jwt = new TokenGeneratorJwt();

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

  async matcherENDController(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { id } = req.params;
    const isValid = this.jwt.decodeToken(authorization as string);
    if (!isValid) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const partidaFinalizada = await this.service.matcherENDService(Number(id));
    return res.status(200).json(partidaFinalizada);
  }

  async matcherUpdateController(req: Request, res: Response) {
    const { authorization } = req.headers;
    const placarPartida = req.body;
    const { id } = req.params;
    const isValid = this.jwt.decodeToken(authorization as string);
    if (!isValid) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const placarAtualizado = await this.service.matcherUpdateService(Number(id), placarPartida);
    return res.status(200).json(placarAtualizado);
  }
}

export default ControllerMatchs;
