import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/users.entity';
import { Credential } from '../entities/credential.entity';
import { RolesEnum } from '../enum/roles.enum';
import { CreatedUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userDataBase: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userDataBase.findOne({
      where: { email },
      relations: ['credential'],
    });
  }

  async createUserRepository(createUserDto: CreatedUserDto): Promise<User> {
    const existingEmail = await this.userDataBase.findOne({
      where: { email: createUserDto.email },
    });

    if (existingEmail) {
      throw new BadRequestException('El correo ya está registrado');
    }

    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let role: RolesEnum = RolesEnum.USER;
    if (
      createUserDto.role &&
      Object.values(RolesEnum).includes(createUserDto.role as RolesEnum)
    ) {
      role = createUserDto.role as RolesEnum;
    }

    return await this.userDataBase.manager.transaction(async (manager) => {
      const newUser = manager.create(User, {
        name: createUserDto.name,
        email: createUserDto.email,
        // agrega aquí lastName, address, phoneNumber, birthDate
        // si existen en tu CreatedUserDto
      });
      const savedUser = await manager.save(newUser);

      const newCredential = manager.create(Credential, {
        username: createUserDto.email, // o createUserDto.username si lo tienes
        password: hashedPassword,
        role,
        user: savedUser,
      });
      await manager.save(newCredential);

      return savedUser;
    });
  }

  async getAllUserRepository(): Promise<User[]> {
    return this.userDataBase.find();
  }

  async getUserByIdRepository(id: string): Promise<User | null> {
    return this.userDataBase.findOne({ where: { id } });
  }

  async putUpdateUserRepository(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.name !== undefined) user.name = updateUserDto.name;
    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;

    return await this.userDataBase.save(user);
  }

  async deleteUserRepository(user: User): Promise<User> {
    await this.userDataBase.remove(user);
    return user;
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    return this.userDataBase.findOne({ where: { name: userName } });
  }

  async getByUserPhone(): Promise<User | null> {
    return null;
  }

  async getUserProfileRepository(user: User): Promise<User> {
    return user;
  }
}