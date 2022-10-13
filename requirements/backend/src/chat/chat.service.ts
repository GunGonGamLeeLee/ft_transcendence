import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';

@Injectable()
export class ChatService {
  constructor(private readonly database: DatabaseService) {}

  async changeUserRoleInChannel(
    myUid: number,
    targetUid: number,
    roomId: number,
    role: UserRoleInChannel,
  ) {
    await this.database.changeUserRoleInChannel(myUid, targetUid, roomId, role);
  }

  async muteUserInChannel(myUid: number, targetUid: number, roomId: number) {
    await this.database.muteUserInChannel(myUid, targetUid, roomId);
  }

  async banUserInChannel(myUid: number, targetUid: number, roomId: number) {
    await this.database.banUserInChannel(myUid, targetUid, roomId);
  }

  async updateChRemovePassword(myUid: number, roomId: number) {
    await this.database.updateChRemovePassword(myUid, roomId);
  }

  async updateChSetPassword(myUid: number, roomId: number, password: string) {
    await this.database.updateChSetPassword(myUid, roomId, password);
  }
}
