import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Credential } from './entities/credential.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { RolesEnum } from './enum/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido a la API de HomeCare';
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
      const filePath = path.resolve(process.cwd(), 'utils', 'data.json');

      if (!fs.existsSync(filePath)) {
        console.warn('Archivo de seed no encontrado:', filePath);
        await queryRunner.rollbackTransaction();
        return;
      }

      const rawData = fs.readFileSync(filePath, 'utf-8');
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
        const cleanPhone = String(user.phoneNumber).trim();

        if (!/^\d+$/.test(cleanPhone)) {
          throw new Error(
            `El phoneNumber del usuario ${user.username} no es válido: ${user.phoneNumber}`,
          );
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newCredential = this.credentialDataBase.create({
          username: user.username,
          password: hashedPassword,
          role: user.roles as RolesEnum,
        });

        await queryRunner.manager.save(newCredential);

        const newUser = this.userDataBase.create({
          name: user.name,
          lastname: user.lastName,
          address: user.address,
          email: user.email,
          phoneNumber: Number(cleanPhone),
          birthDate: user.birthDate,
          credential: newCredential,
        });

        await queryRunner.manager.save(newUser);
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