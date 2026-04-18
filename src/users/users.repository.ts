import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { Credential } from 'src/entities/credential.entity';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreatedUserDto } from './Dtos/createUser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';

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
      relations: ['credential'],
    });
  }

  async createUserRepository(createUserDto: CreatedUserDto) {
    // ✅ Validar email
    const existingEmail = await this.userDataBase.findOne({
      where: { email: createUserDto.email },
    });

    if (existingEmail) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // ✅ CORREGIDO: username (no userName)
    const existingUsername = await this.credentialDataBase.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUsername) {
      throw new BadRequestException('El nombre de usuario ya está en uso');
    }

    if (!createUserDto.password) {
      throw new BadRequestException('Password is required');
    }

    // ✅ Hash
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // ✅ Rol
    let role: RolesEnum = RolesEnum.USER;

    if (
      createUserDto.role &&
      Object.values(RolesEnum).includes(createUserDto.role as RolesEnum)
    ) {
      role = createUserDto.role as RolesEnum;
    }

    // ✅ Crear credencial (CORREGIDO)
    const newCredential = this.credentialDataBase.create({
      username: createUserDto.username,
      password: hashedPassword,
      role,
    });

    await this.credentialDataBase.save(newCredential);

    // ✅ Crear usuario
    const newUser = this.userDataBase.create({
      name: createUserDto.name,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
      address: createUserDto.address,
      birthDate: createUserDto.birthDate,
      credential: newCredential,
    });

    return await this.userDataBase.save(newUser);
  }

  async getAllUserRepository(): Promise<User[]> {
    return this.userDataBase.find({ relations: ['credential'] });
  }

  async getUserByIdRepository(id: string): Promise<User | null> {
    return this.userDataBase.findOne({
      where: { id },
      relations: ['credential'],
    });
  }

  async putUpdateUserRepository(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    Object.assign(user, updateUserDto);
    return this.userDataBase.save(user);
  }

  async deleteUserRepository(user: User): Promise<User> {
    user.isActive = false;
    return this.userDataBase.save(user);
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    return this.userDataBase.findOne({
      where: { credential: { username: userName } },
      relations: ['credential'],
    });
  }

  async getByUserPhone(phoneNumber: number | undefined): Promise<User | null> {
    return this.userDataBase.findOne({
      where: { phoneNumber },
      relations: ['credential'],
    });
  }

  async getUserProfileRepository(user: User): Promise<User> {
    return user;
  }
}