import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpError extends Error{
  status:number;
  constructor(status:number, message:string){
    super(message);
    this.status=status;
  }
}


export class TokenExpiredError extends HttpError{
  constructor(){
    super(401,'Token has expired')
  }
}

export class AuthError extends HttpError {

  constructor(status:number, message:string) {
    super(status, message);
  }

}
