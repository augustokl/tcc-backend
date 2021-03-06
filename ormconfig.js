export default {
  type: process.env.DATABESE_TYPE,
  host: process.env.DATABESE_HOST,
  port: process.env.DATABESE_PORT,
  username: process.env.DATABESE_USERNAME,
  password: process.env.DATABESE_PASSWORD,
  database: process.env.DATABESE_NAME,
  logging: ['error'],
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
  // cache: {
  //   type: process.env.DATABASE_CACHE,
  //   options: {
  //     host: process.env.REDIS_HOST,
  //     port: process.env.REDIS_PORT,
  //   },
  // },
};
