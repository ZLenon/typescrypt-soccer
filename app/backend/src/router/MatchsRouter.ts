import { Router, Request, Response } from 'express';
import validToken from '../middlewares/validToken';
import ControllerMatchs from '../controllers/MatchsController';

const routerMatchs = Router();

const Ctrl = new ControllerMatchs();

routerMatchs.get(
  '/',
  (req: Request, res: Response) => Ctrl.allMatcherController(req, res),
);
routerMatchs.post(
  '/',
  validToken.validTK,
  (req: Request, res: Response) => Ctrl.createMathInProgressController(req, res),
);
routerMatchs.patch(
  '/:id',
  validToken.validTK,
  (req: Request, res: Response) => Ctrl.matcherUpdateController(req, res),
);

routerMatchs.patch(
  '/:id/finish',
  validToken.validTK,
  (req: Request, res: Response) => Ctrl.matcherENDController(req, res),
);

export default routerMatchs;
