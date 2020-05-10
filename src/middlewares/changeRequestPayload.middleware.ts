import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ChangeRequestPayload implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    req['user'] = 'my name'; 
    next();
  }
}
