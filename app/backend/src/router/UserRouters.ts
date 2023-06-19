import { Router, Request, Response } from 'express';
import ControllerUser from '../controllers/UserController';
import validToken from '../middlewares/validToken';

const routerUser = Router();

const Ctrl = new ControllerUser();

routerUser.post(
  '/',
  (req: Request, res: Response) => Ctrl.findUserController(req, res),
);
routerUser.get(
  '/role',
  validToken.validTK,
  (req: Request, res: Response) => Ctrl.findRoleController(req, res),
);

export default routerUser;
