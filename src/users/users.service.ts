import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreatedUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(createUserDto: CreatedUserDto) {
    return this.usersRepository.createUserRepository(createUserDto);
  }

  getAllUsers() {
    return this.usersRepository.getAllUserRepository();
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserByIdRepository(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(id);
    return this.usersRepository.putUpdateUserRepository(user, updateUserDto);
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    return this.usersRepository.deleteUserRepository(user);
  }

  getUserByUsername(username: string) {
    return this.usersRepository.getUserByUsername(username);
  }

  getUserByPhone() {
    return this.usersRepository.getByUserPhone();
  }

  async getUserProfile(id: string) {
    const user = await this.getUserById(id);
    return this.usersRepository.getUserProfileRepository(user);
  }
}