import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin123',
  database: 'homecare',
  entities: ['./src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,
});
