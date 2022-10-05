import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { UserEntity } from './database/db.user/entity.user';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '/backend.env',
});

const userDbOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_USER_HOST,
  port: +process.env.DB_USER_PORT,
  username: process.env.DB_USER_USERNAME,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_USER_DATABASE,
  entities: [UserEntity],
  synchronize: true,
};

@Module({
  imports: [LoginModule, DatabaseModule, TypeOrmModule.forRoot(userDbOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
