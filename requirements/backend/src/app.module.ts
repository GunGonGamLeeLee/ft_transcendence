import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { UserEntity } from './database/entity/entity.user';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FriendListEntity } from './database/entity/entity.friend.list';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '/backend.env',
});

const dbOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, FriendListEntity],
  synchronize: true,
};

@Module({
  imports: [LoginModule, DatabaseModule, TypeOrmModule.forRoot(dbOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
