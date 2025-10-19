import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🚀 Servidor NestJS funcionando correctamente en el puerto 3002';
  }
}
