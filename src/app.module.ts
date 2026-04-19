import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import typeorm from './config/typeorm';

import { AppController } from './app.controller';
import { AppService, DataLoaderUsers } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CredentialModule } from './credential/credential.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { CategoryModule } from './category/category.module';
import { SeedModule } from './seed/seed.module';

import { User } from './entities/users.entity';
import { Credential } from './entities/credential.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const typeormConfig = config.get('typeorm');

        if (!typeormConfig) {
          throw new Error('TypeORM config is undefined');
        }

        return typeormConfig;
      },
    }),

    TypeOrmModule.forFeature([User, Credential]),

    UsersModule,
    AuthModule,
    ProductsModule,
    CredentialModule,
    OrdersModule,
    OrderDetailModule,
    CategoryModule,
    SeedModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET') || 'secretKey',
        signOptions: {
          expiresIn: Number(config.get<string>('JWT_EXPIRES_IN') ?? 3600),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DataLoaderUsers],
})
export class AppModule {}