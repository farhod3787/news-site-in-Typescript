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
    this.error = error;
  }
}

export class DuplicateError extends Error implements HttpException{
  status: number;
  error: any;
  
  constructor(error) {
    super();
    this.message = "Duplicate error";
    this.status = 409;
    this.error = error;
  }
}

export class NotFound extends Error implements HttpException{
  status: number
  error: any

  constructor(error) {
    super();
    this.message = "Ничего не найдено"
    this.status = 404
    this.error = error
  }
}