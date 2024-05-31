import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest()
      const refreshToken = req.cookies.refresh;
      console.log(refreshToken)
      const { sub, email } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>(
          'APPS.SERVER.ADMIN.JWT.REFRESH.SECRET'
        ),
      })
      req.user = {sub, email, refreshToken}
      return true;
    } catch (error) {
      throw new ForbiddenException('Unauthorized')
    }
  }
}
