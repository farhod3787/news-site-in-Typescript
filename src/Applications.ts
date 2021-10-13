import * as cors from 'cors';
import * as compress from 'compression';
import * as helmet  from 'helmet';
import * as express from 'express';
import { urlencoded, json } from 'body-parser';
import config from './config';
import { AdminController } from './controllers/admin';

class Applications {
private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    this.app.use(urlencoded({ extended: true}));
    this.app.use(json());
    // this.app.use(helmet());
    // this.app.use(compress());
    this.app.use(cors());
  }

  public routes(): void {
    const v = config.development.apiVersion;
    this.app.use(`/api/${v}/admin`, new AdminController().routes);
  }

  get instance() {
    return this.app
  }
}

export const App = new Applications().instance