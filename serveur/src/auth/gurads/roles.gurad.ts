import { ROLES_KEY } from './../decorator/roles.decorator';
import { User } from 'src/user/models/user.interface';
import { map, Observable } from 'rxjs';
import { UserService } from './../../user/service/user.service';
import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const Roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!Roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request)
    
    const user : User= request.user.user;
    
      console.log(user.role)

    
    if (!Roles.includes(user.role)) {
      throw new UnauthorizedException('not admin ');
      
    }
    return Roles.includes(user.role);
  }
}