import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, DatabaseModule, AuthModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
