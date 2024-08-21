import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: '.dev.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['../**/*.entity.ts'],
  migrations: ['../src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
