import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreatedUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
  putUpdateUserService: any;
  deleteUserService: any;
  postCreateUserService(createUserDto: CreatedUserDto) {
    throw new Error('Method not implemented.');
  }
  getUserProfileService(uuid: string) {
    throw new Error('Method not implemented.');
  }
  getUserByIdService(uuid: string) {
    throw new Error('Method not implemented.');
  }
  getAllUserService() {
    throw new Error('Method not implemented.');
  }
  getUserByNameService(name: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(createUserDto: CreatedUserDto) {
    return this.usersRepository.createUserRepository(createUserDto);
  }

  getAllUsers() {
    return this.usersRepository.getAllUserRepository();
  }

  getUserById(id: string) {
    return this.usersRepository.getUserByIdRepository(id);
  }

  updateUser(user: User, updateUserDto: UpdateUserDto) {
    return this.usersRepository.putUpdateUserRepository(user, updateUserDto);
  }

  deleteUser(user: User) {
    return this.usersRepository.deleteUserRepository(user);
  }
}
