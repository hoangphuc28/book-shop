import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        throw new ForbiddenException('Authorization header not found');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new ForbiddenException('Access token not found');
      }
      const { sub, email } = this.jwtService.verify(token, {
        secret: this.configService.get<string>(
          'APPS.SERVER.ADMIN.JWT.ACCESS.SECRET'
        ),
      })
      req.user = {sub, email}

      return true;
    } catch (error) {
      throw new ForbiddenException('Unauthorized')
    }
  }
}
