// import ModelPartidas from '../database/models/MatchsModel';
import { ILeaderBoard } from '../Interfaces/interfacesMigrations';
import ModelLeaderboard from '../models/LeaderboardModel';

class ServiceLeaderBoard {
  private model = new ModelLeaderboard();

  public async leaderBoardService(): Promise<ILeaderBoard[]> {
    const infoTime = await this.model.retornoFinalLeaderboard();
    return ModelLeaderboard.ordenaTimes(infoTime);
  }
}

export default ServiceLeaderBoard;
