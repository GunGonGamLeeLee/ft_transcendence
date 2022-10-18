import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { DmModule } from './dm/dm.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { GameModule } from './game/game.module';
import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV === 'dev' ? '/dev.backend.env' : '/prod.backend.env',
});

const configDb = new DocumentBuilder()
  .setTitle('db controller')
  .setDescription('db control description')
  .setVersion('1.0')
  .build();

const optionDb: SwaggerDocumentOptions = {
  include: [DatabaseModule, GameModule],
};

const configApi = new DocumentBuilder()
  .setTitle('api')
  .setDescription('API description')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'JWT',
      in: 'header',
    },
    'access-token',
  )
  .build();

const optionApi: SwaggerDocumentOptions = {
  include: [ChatModule, UsersModule, DmModule, AuthModule, LoginModule],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '64mb' }));
  app.use(bodyParser.urlencoded({ limit: '64mb', extended: true }));

  const documentDb = SwaggerModule.createDocument(app, configDb, optionDb);
  SwaggerModule.setup('database', app, documentDb);
  const documentApi = SwaggerModule.createDocument(app, configApi, optionApi);
  SwaggerModule.setup('api', app, documentApi);

  app.enableCors({
    origin: process.env.FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4243);
}
bootstrap();
