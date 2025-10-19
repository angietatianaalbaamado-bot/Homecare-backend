import { Module } from '@nestjs/common';
import { TipoServicioService } from './tipo-servicio.service';
import { TipoServicioController } from './tipo-servicio.controller';

@Module({
  providers: [TipoServicioService],
  controllers: [TipoServicioController]
})
export class TipoServicioModule {}
