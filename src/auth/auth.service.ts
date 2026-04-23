import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!user.credential) {
      throw new UnauthorizedException('Credencial no asociada');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.credential.password || '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
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
      },
    };
  }
}