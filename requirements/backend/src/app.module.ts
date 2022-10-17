import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { UserEntity } from './database/entity/entity.user';
import { FriendListEntity } from './database/entity/entity.friend.list';
import { BlockListEntity } from './database/entity/entity.block.list';
import * as dotenv from 'dotenv';
import { ChannelEntity } from './database/entity/entity.channel';
import { UserInChannelEntity } from './database/entity/entity.user.in.channel';
import { DmLogEntity } from './database/entity/entity.dm.log';
import { UsersModule } from './users/users.module';
import { MatchHistoryEntity } from './database/entity/entity.matchhistory.list';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { DmModule } from './dm/dm.module';
import { AppGateway } from './app.gateway';
import { LoggerMiddleware } from './logger.middleware';
import { GameModule, GameRoomModule } from './game/game.module';
import { MatchMakingModule } from './game/match.module';

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
  entities: [
    UserEntity,
    FriendListEntity,
    BlockListEntity,
    ChannelEntity,
    UserInChannelEntity,
    DmLogEntity,
    MatchHistoryEntity,
  ],
  synchronize: true,
};

@Module({
  imports: [
    ChatModule,
    UsersModule,
    LoginModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(dbOptions),
    DatabaseModule,
    DmModule,
    GameModule,
    GameRoomModule,
    MatchMakingModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/chat/pwd');
  }
}
