import { Request, Response } from 'express';
import ServiceTeams from '../services/TeamsServices';

class ControllerTeams {
  private service = new ServiceTeams();

  async allteamsController(_req: Request, res: Response) {
    const allTimes = await this.service.allteamsService();
    return res.status(200).json(allTimes.data);
  }

  async findTeamIdController(req: Request, res: Response) {
    const { id } = req.params;
    const allTimes = await this.service.findTeamIdService(Number(id));
    return res.status(200).json(allTimes.data);
  }
}

export default ControllerTeams;
