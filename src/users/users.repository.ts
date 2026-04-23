import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/users.entity';
import { Credential } from 'src/entities/credential.entity';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreatedUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userDataBase: Repository<User>,

    @InjectRepository(Credential)
    private readonly credentialDataBase: Repository<Credential>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userDataBase.findOne({
      where: { email },
      relations: {
        credential: true,
      },
    });
  }

  async createUserRepository(createUserDto: CreatedUserDto): Promise<User> {
    const existingEmail = await this.userDataBase.findOne({
      where: { email: createUserDto.email },
    });

    if (existingEmail) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const existingUsername = await this.credentialDataBase.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUsername) {
      throw new BadRequestException('El nombre de usuario ya está en uso');
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

    const newCredential = this.credentialDataBase.create({
      username: createUserDto.username,
      password: hashedPassword,
      role,
    });

    const savedCredential = await this.credentialDataBase.save(newCredential);

    const newUser = this.userDataBase.create({
      name: createUserDto.name,
      lastName: createUserDto.lastname,
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
      address: createUserDto.address,
      birthDate: createUserDto.birthDate,
      isActive: true,
      credential: savedCredential,
    });

    const savedUser = await this.userDataBase.save(newUser);

    savedCredential.user = savedUser;
    await this.credentialDataBase.save(savedCredential);

    return await this.userDataBase.findOneOrFail({
      where: { id: savedUser.id },
      relations: {
        credential: true,
      },
    });
  }

  async getAllUserRepository(): Promise<User[]> {
    return this.userDataBase.find({
      relations: {
        credential: true,
      },
    });
  }

  async getUserByIdRepository(id: string): Promise<User | null> {
    return this.userDataBase.findOne({
      where: { id },
      relations: {
        credential: true,
      },
    });
  }

  async putUpdateUserRepository(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (updateUserDto.name !== undefined) user.name = updateUserDto.name;
    if (updateUserDto.lastname !== undefined) user.lastName = updateUserDto.lastname;
    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
    if (updateUserDto.phoneNumber !== undefined) user.phoneNumber = updateUserDto.phoneNumber;
    if (updateUserDto.address !== undefined) user.address = updateUserDto.address;
    if (updateUserDto.birthDate !== undefined) user.birthDate = updateUserDto.birthDate;

    return await this.userDataBase.save(user);
  }

  async deleteUserRepository(user: User): Promise<User> {
    user.isActive = false;
    return await this.userDataBase.save(user);
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    return this.userDataBase.findOne({
      where: {
        credential: {
          username: userName,
        },
      },
      relations: {
        credential: true,
      },
    });
  }

  async getByUserPhone(phoneNumber: number | undefined): Promise<User | null> {
    if (phoneNumber === undefined) {
      return null;
    }

    return this.userDataBase.findOne({
      where: { phoneNumber },
      relations: {
        credential: true,
      },
    });
  }

  async getUserProfileRepository(user: User): Promise<User> {
    return user;
  }
}