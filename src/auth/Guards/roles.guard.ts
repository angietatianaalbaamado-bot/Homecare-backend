import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from 'src/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RolesEnum[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // si no hay roles definidos, acceso permitido
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // tu UserAuthGuard debe haber agregado el usuario
    return requiredRoles.includes(user.role);
  }
}
