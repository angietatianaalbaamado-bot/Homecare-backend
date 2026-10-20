import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// deja también los otros módulos que ya tengas (auth, orders, etc.)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        return {
          type: 'postgres' as const,
          ...(url
            ? { url }
            : {
                host: config.get<string>('POSTGRES_HOST'),
                port: Number(config.get('POSTGRES_PORT') ?? 5432),
                username: config.get<string>('POSTGRES_USER'),
                password: config.get<string>('POSTGRES_PASSWORD'),
                database: config.get<string>('POSTGRES_DB'),
              }),
          ssl:
            config.get('DATABASE_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
          autoLoadEntities: true,
          synchronize: config.get('DB_SYNC') === 'true',
        };
      },
    }),
    UsersModule,
    // ...tus otros módulos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}