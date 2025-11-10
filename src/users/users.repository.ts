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

  // Crear usuario y credencial
  async createUserRepository(createUserDto: CreatedUserDto) {
    // Validación de correo
    const existingUser = await this.userDataBase.findOne({ where: { email: createUserDto.email } });
    if (existingUser) throw new BadRequestException('El correo ya está registrado');

    // Validación de username
    const existingUsername = await this.credentialDataBase.findOne({ where: { userName: createUserDto.userName } });
    if (existingUsername) throw new BadRequestException('El nombre de usuario ya está en uso');

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Determinar rol válido usando enum
    let role: RolesEnum = RolesEnum.USER; // valor por defecto
    if (createUserDto.roles && Object.values(RolesEnum).includes(createUserDto.roles as RolesEnum)) {
      role = createUserDto.roles as RolesEnum;
    }

    // Crear credencial
    const newCredential = this.credentialDataBase.create({
      userName: createUserDto.userName,
      password: hashedPassword,
      role: role,
    });
    await this.credentialDataBase.save(newCredential);

    // Crear usuario asociado a la credencial
    const newUser = this.userDataBase.create({
      name: createUserDto.name,
      lastName: createUserDto.lastname,
      email: createUserDto.email,
      phoneNumber: createUserDto.phoneNumber,
      address: createUserDto.address,
      birthDate: createUserDto.birthDate,
      isActive: true,
      credential: newCredential,
    });
    await this.userDataBase.save(newUser);

    return newUser;
  }

  // Obtener todos los usuarios
  async getAllUserRepository(): Promise<User[]> {
    return this.userDataBase.find({ relations: ['credential'] });
  }

  // Obtener usuario por ID
  async getUserByIdRepository(id: string): Promise<User | null> {
    return this.userDataBase.findOne({ where: { uuid: id }, relations: ['credential'] });
  }

  // Actualizar usuario
  async putUpdateUserRepository(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    Object.assign(user, updateUserDto);
    return this.userDataBase.save(user);
  }

  // Eliminar usuario (soft delete)
  async deleteUserRepository(user: User): Promise<User> {
    user.isActive = false;
    return this.userDataBase.save(user);
  }

  // Buscar usuario por correo
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userDataBase.findOne({ where: { email }, relations: ['credential'] });
  }

  // Buscar usuario por username
  async getUserByNameRepository(name: string): Promise<User[]> {
    return this.userDataBase.find({ where: { name }, relations: ['credential'] });
  }

  // Buscar usuario por teléfono
  async getByUserPhoneNumber(phoneNumber: string | number): Promise<User | null> {
    const phone = typeof phoneNumber === 'string' ? Number(phoneNumber) : phoneNumber;
    return this.userDataBase.findOne({ where: { phoneNumber: phone }, relations: ['credential'] });
  }

  // Obtener perfil de usuario
  async getUserProfileRepository(user: User): Promise<User> {
    return user;
  }
}
