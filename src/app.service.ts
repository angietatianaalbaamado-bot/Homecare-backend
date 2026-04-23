import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

import { User } from './entities/users.entity';
import { Credential } from './entities/credential.entity';
import { RolesEnum } from './enum/roles.enum';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenidos a Sena mujeres digitales';
  }
}

@Injectable()
export class DataLoaderUsers implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userDataBase: Repository<User>,

    @InjectRepository(Credential)
    private readonly credentialDataBase: Repository<Credential>,
  ) {}

  async onModuleInit() {
    const usersCount = await this.userDataBase.count();

    if (usersCount > 0) {
      console.log('Los usuarios ya existen en la base de datos');
      return;
    }

    console.log('Cargando usuarios iniciales...');

    const queryRunner = this.userDataBase.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const filePath = path.resolve(__dirname, '..', 'utils', 'data.json');
      const rawData = fs.readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');

      const users = JSON.parse(rawData) as Array<{
        username: string;
        password: string;
        name: string;
        lastName: string;
        address: string;
        email: string;
        phoneNumber: string;
        birthDate: string;
        roles: string;
      }>;

      for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newCredential = this.credentialDataBase.create({
          username: user.username,
          password: hashedPassword,
          role: user.roles as RolesEnum,
        });

        const savedCredential = await queryRunner.manager.save(Credential, newCredential);

        const newUser = this.userDataBase.create({
          name: user.name,
          lastName: user.lastName,
          address: user.address,
          email: user.email,
          phoneNumber: Number(user.phoneNumber),
          birthDate: user.birthDate,
          isActive: true,
          credential: savedCredential,
        });

        const savedUser = await queryRunner.manager.save(User, newUser);

        savedCredential.user = savedUser;
        await queryRunner.manager.save(Credential, savedCredential);
      }

      await queryRunner.commitTransaction();
      console.log('Usuarios precargados correctamente');
    } catch (error) {
      console.error('Error al precargar usuarios:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}