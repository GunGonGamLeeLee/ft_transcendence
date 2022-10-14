import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ChatController } from './chat.controller';
import { ChatRoomListService } from './chat.room.list.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ChatController],
  providers: [ChatRoomListService],
})
export class ChatModule {}
