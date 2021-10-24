import * as cors from 'cors';
import * as compress from 'compression';
import * as helmet  from 'helmet';
import * as express from 'express';
import { urlencoded, json } from 'body-parser';
import config from './config';
import { AdminController } from './controllers/admin';
import { LangController } from './controllers/languages';
import { CategoryController } from './controllers/categories';
import { ContentController } from './controllers/content';

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
    this.app.use(helmet());
    this.app.use(compress());
    this.app.use(cors());
  }

  public routes(): void {
    const v = config.development.apiVersion;
    this.app.use(`/api/${v}/admin`, new AdminController().routes);
    this.app.use(`/api/${v}/language`, new LangController().routes);
    this.app.use(`/api/${v}/category`, new CategoryController().routes);
    this.app.use(`/api/${v}/content`, new ContentController().routes);
  }

  get instance() {
    return this.app
  }
}

export const App = new Applications().instance