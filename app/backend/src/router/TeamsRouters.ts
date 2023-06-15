import { Router, Request, Response } from 'express';
import ControllerTeams from '../controllers/TeamsController';

const routerTeams = Router();

const Ctrl = new ControllerTeams();

routerTeams.get(
  '/',
  (req: Request, res: Response) => Ctrl.allteamsController(req, res),
);
routerTeams.get(
  '/:id',
  (req: Request, res: Response) => Ctrl.findTeamIdController(req, res),
);

export default routerTeams;
