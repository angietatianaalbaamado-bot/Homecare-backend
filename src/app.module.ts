import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TipoServicioModule } from './tipo-servicio/tipo-servicio.module';
import { ServicioModule } from './servicio/servicio.module';
import { PagoModule } from './pago/pago.module';
import { ClasificacionModule } from './clasificacion/clasificacion.module';
import { AppController } from './app.controller'; // 👈 importa el controlador principal
import { AppService } from './app.service';       // 👈 importa el servicio principal

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ solo en desarrollo
    }),
    UsuariosModule,
    TipoServicioModule,
    ServicioModule,
    PagoModule,
    ClasificacionModule,
  ],
  controllers: [AppController], // 👈 agrega el controlador
  providers: [AppService],      // 👈 agrega el servicio
})
export class AppModule {}
