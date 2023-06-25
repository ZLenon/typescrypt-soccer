import * as express from 'express';
import routerTeams from './router/TeamsRouters'; // Rota de times
import routerUser from './router/UserRouters'; // Rota de usuario
import routerMatchs from './router/MatchsRouter'; // Rota de partidas
import routerLeaderboard from './router/LeaderboardRouter'; // Rota de leaderboard

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/teams', routerTeams);// Rota de times
    this.app.use('/login', routerUser);// Rota de usuario
    this.app.use('/matches', routerMatchs);// Rota de partidas
    this.app.use('/leaderboard', routerLeaderboard);// Rota de leaderboard
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
