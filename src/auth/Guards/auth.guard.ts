import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('El token es requerido para acceder a esta ruta');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new BadRequestException('Falta la configuración de la variable JWT_SECRET en el servidor');
    }

    try {
      // Verifica y decodifica el token
      const payload = this.jwtService.verify(token, { secret });

      // Normaliza las fechas de emisión y expiración
      payload.exp = new Date(payload.exp * 1000);
      payload.iat = new Date(payload.iat * 1000);

      // Verifica que el token tenga rol asignado
      if (!payload.role) {
        throw new UnauthorizedException('No tienes los permisos necesarios');
      }

      // Inyecta la información del usuario en la request
      (request as any).user = payload;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('El token ha expirado, por favor inicia sesión nuevamente');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('El token proporcionado no es válido');
      }
      throw new UnauthorizedException('Error de autenticación');
    }
  }

  /** 
   * Extrae el token del encabezado Authorization 
   * con formato: Bearer <token>
   */
  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' && token ? token : null;
  }
}
