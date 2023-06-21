import { Router, Request, Response } from 'express';
import ControllerMatchs from '../controllers/MatchsController';

const routerMatchs = Router();

const Ctrl = new ControllerMatchs();

routerMatchs.get(
  '/',
  (req: Request, res: Response) => Ctrl.allMatcherController(req, res),
);

export default routerMatchs;
