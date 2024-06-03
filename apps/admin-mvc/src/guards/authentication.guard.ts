import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AdminService } from '../app/admin/admin.service';

@Injectable()
export class Authentication implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private adminService: AdminService

  ) { }
  async canActivate(context: ExecutionContext):  Promise<boolean>{
    try {
      const req = context.switchToHttp().getRequest()
      const session = req.cookies.session;
      const { sub, email } = this.jwtService.verify(session)
      req.user = {sub, email, session}
      const admin = await this.adminService.findAdmin(email)
      if(admin.session !== session) {
        context.switchToHttp().getResponse().redirect('/');
      }
      return true;
    } catch (error) {
      console.log(error)
      context.switchToHttp().getResponse().redirect('/');
    }
  }
}
