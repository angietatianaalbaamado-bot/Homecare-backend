import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

// Función para validar el request
function ValidateRequest(request: Request): boolean {
  const token = request.headers['token'] as string | undefined;
  console.log('este es el token:', token);
  return token === '12345';
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return ValidateRequest(request);
  }
}

// Alias para compatibilidad
export { UserAuthGuard as AuthGuard };
