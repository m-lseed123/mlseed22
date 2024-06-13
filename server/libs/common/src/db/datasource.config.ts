import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './schemas/user.schema';

dotenvConfig({ path: __dirname + '../../../.env' });

const dataSourceOptions: DataSourceOptions & { cli: any } = {
  type: 'postgres',
  // host: `${process.env.DATABASE_HOST}`,
  // port: Number(`${process.env.DATABASE_PORT}`),
  // username: `${process.env.DATABASE_USERNAME}`,
  // password: `${process.env.DATABASE_PASSWORD}`,
  // database: `${process.env.DATABASE_NAME}`,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',

  migrations: [__dirname + '/migrations/here/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: __dirname + '/migrations/here',
  },
  // entities: [__dirname + '/schemas/*.schema{.ts,.js}'],

  entities: [User],
  synchronize: false,
};

export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions,
);
