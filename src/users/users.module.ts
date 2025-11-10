import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/users.entity';
import { Credential } from 'src/entities/credential.entity';
import { CredentialModule } from 'src/credential/credential.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credential]), CredentialModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
