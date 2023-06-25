import { Router, Request, Response } from 'express';
import ControllerLeaderboard from '../controllers/LeaderboardController';

const routerLeaderboard = Router();

const Ctrl = new ControllerLeaderboard();

routerLeaderboard.get(
  '/home',
  (req: Request, res: Response) => Ctrl.leaderBoardController(req, res),
);

export default routerLeaderboard;
