import { Request, Response } from 'express';
import ServiceLeaderBoard from '../services/LeaderboardService';

class ControllerLeaderBoard {
  private service = new ServiceLeaderBoard();

  async leaderBoardController(_req: Request, res: Response) {
    const infoTime = await this.service.leaderBoardService();
    return res.status(200).json(infoTime);
  }
}
export default ControllerLeaderBoard;
