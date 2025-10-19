import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // ✅ Aquí registramos el repositorio
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // opcional, si lo usarás en otros módulos
})
export class UsuariosModule {}
