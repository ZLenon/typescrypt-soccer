import { Request, Response } from 'express';
import TokenGeneratorJwt from '../services/jwtService';
import ServiceUser from '../services/UserService';

class ControllerUser {
  private service = new ServiceUser();
  private jwt = new TokenGeneratorJwt();

  async findUserController(req: Request, res: Response) {
    const allBody = req.body;
    // console.log('Controler', req.body);
    const usuario = await this.service.findUserService(allBody);

    if (usuario.type === 'CONFLICT') {
      return res.status(400).json(usuario.data);
    }
    if (usuario.type === 'NOT_FOUND') {
      return res.status(401).json(usuario.data);
    }
    return res.status(200).json({ token: usuario.data });
  }

  findRoleController(req: Request, res: Response) {
    const { authorization } = req.headers;
    const isValid = this.jwt.decodeToken(authorization as string);
    if (!isValid) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const info = this.jwt.decodeToken(authorization as string);
    return res.status(200).json(info);
  }
}

export default ControllerUser;
