import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user || !user.credential) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.credential.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.credential.role,
      },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1d' },
    );

    return {
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.credential.role,
        name: user.name,
      },
    };
  }
}