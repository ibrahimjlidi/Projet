import { UserModule } from './../user/user.module';
import { UserService } from './../user/service/user.service';
import { JwtStrategy } from 'src/auth/gurads/jwt-strategy';
import { JwtAuthGuard } from './gurads/jwt-guard';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { RolesGuard } from './gurads/roles.gurad';

@Module({
  imports:[
    forwardRef(()=> UserModule),
    JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],

    useFactory:async(configService: ConfigService) =>({
       secret: configService.get('JWT_SECRET'),
       signOptions: {expiresIn: '1d'}
      }),


    })

],
  providers: [AuthService,JwtStrategy,RolesGuard,JwtAuthGuard],
  exports:[AuthService,JwtStrategy]
})
export class AuthModule {}
