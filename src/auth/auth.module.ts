import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module'; // Importa el módulo de usuarios
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule, // Importa para resolver UsersRepository
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'clave-secreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
