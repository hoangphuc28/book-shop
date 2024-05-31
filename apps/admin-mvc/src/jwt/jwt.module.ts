import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>(
        'APPS.SERVER.ADMIN.JWT.SESSION.SECRET'
      ),
    }),
    inject: [ConfigService]
  })],
  exports: [JwtModule]
})
export class JWTModule {}
