import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class Authentication implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const session = req.cookies.session;
      const { sub, email } = this.jwtService.verify(session)
      req.user = {sub, email, session}
      return true;
    } catch (error) {
      console.log(error)
      context.switchToHttp().getResponse().redirect('/');
    }
  }
}
