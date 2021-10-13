import { NextFunction, Request, Response, Router } from "express";

export interface IBaseController {
  routes: Router
}

export interface ICustomResponse extends Response {
    respondDeleted: (data: any) => void;
    respondUpdated: (data: any) => void;
    respondCreated: (data: any) => void;
    respondOk: (data: any) => void;
}

export abstract class BaseController {
  protected readonly router: Router = Router();
  abstract get routes() : Router;
}

export class CustomResponse extends BaseController{
  respondOk(res: Response) {
    return (data: any) : void => {
      res.status(200).send({
        message: 'Successful request',
        status: 200,
        data
      })
    }
  }

  respondCreated(res: Response) {
    return (data: any): void => {
      res.status(200).send({
        message: 'Create request was successfully completed',
        status: 200,
        data
      })
    }
  }

  respondUpdated(res: Response) {
    return(data: any): void => {
      res.status(200).send({
        message: 'Update request was successfully completed',
        status: 200,
        data
      })
    }
  }

  respondDeleted(res: Response) {
    return(data: any): void => {
      res.status(200).send({
        message: 'Deleted request was successfully complated',
        status: 200,
        data
      })
    }
  }

  get routes() {
    const self = this;
    this.router.use( (req: Request, res: ICustomResponse, next: NextFunction) => {
      res.respondOk = self.respondOk(res);
      res.respondCreated = self.respondCreated(res);
      res.respondUpdated = self.respondUpdated(res);
      res.respondDeleted = self.respondDeleted(res);
      next();
    })
    return this.router;
  }
} 