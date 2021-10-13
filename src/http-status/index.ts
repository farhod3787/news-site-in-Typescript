export interface HttpException {
  status: number,
  error: any
}

export class BadRequest extends Error implements HttpException{
  status: number;
  error: any;

  constructor(error) {
    super();
    this.message = "Bad request";
    this.status = 400;
    this.error - error;
  }
}