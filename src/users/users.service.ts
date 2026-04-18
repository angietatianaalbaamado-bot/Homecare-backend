import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreatedUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // ✅ Crear usuario
  createUser(createUserDto: CreatedUserDto) {
    return this.usersRepository.createUserRepository(createUserDto);
  }

  // ✅ Obtener todos
  getAllUsers() {
    return this.usersRepository.getAllUserRepository();
  }

  // ✅ Obtener por ID
  async getUserById(id: string) {
    const user = await this.usersRepository.getUserByIdRepository(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // ✅ Actualizar usuario
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(id);
    return this.usersRepository.putUpdateUserRepository(user, updateUserDto);
  }

  // ✅ Eliminar usuario
  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    return this.usersRepository.deleteUserRepository(user);
  }

  // ✅ Buscar por username
  getUserByUsername(username: string) {
    return this.usersRepository.getUserByUsername(username);
  }

  // ✅ Buscar por teléfono
  getUserByPhone(phone: string) {
    return this.usersRepository.getByUserPhone(Number(phone));
  }

  // ✅ Perfil
  async getUserProfile(id: string) {
    const user = await this.getUserById(id);
    return this.usersRepository.getUserProfileRepository(user);
  }
}

