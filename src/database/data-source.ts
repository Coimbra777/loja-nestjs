import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Category } from '../modules/categories/entities/category.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5433),
  username: process.env.DB_USER || 'a4pm',
  password: process.env.DB_PASSWORD || 'a4pm123',
  database: process.env.DB_NAME || 'a4pm_training',
  entities: [User, Category],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
