import { ForbiddenError } from '@nestjs/apollo';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class GaphAuth implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) { }
  canActivate(context: ExecutionContext): boolean {
    try {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
      }
      const token = authHeader.split(' ')[1];
      const { sub, email } = this.jwtService.verify(token, {
        secret: this.configService.get<string>(
          'APPS.SERVER.CUSTOMER.JWT.ACCESS.SECRET'
        ),
      })
      ctx.getContext().user = {sub, email}
      return true;
    } catch (error) {
      throw new ForbiddenError('Unauthorized')
    }
  }
}
