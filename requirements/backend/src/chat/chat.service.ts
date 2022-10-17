import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserInChannelDto } from 'src/database/dto/user.in.channel.dto';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';

@Injectable()
export class ChatService {
  constructor(private readonly database: DatabaseService) {}

  async changeUserRoleInChannel(
    myUid: number,
    targetUid: number,
    chid: number,
    role: UserRoleInChannel,
  ) {
    await this.database.changeUserRoleInChannel(myUid, targetUid, chid, role);
  }

  async muteUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.database.muteUserInChannel(myUid, targetUid, chid);
  }

  async banUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.database.banUserInChannel(myUid, targetUid, chid);
  }

  async unmuteUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.database.unmuteUserInChannel(myUid, targetUid, chid);
  }

  async unbanUserInChannel(myUid: number, targetUid: number, chid: number) {
    await this.database.unbanUserInChannel(myUid, targetUid, chid);
  }

  async updateChRemovePassword(myUid: number, chid: number) {
    await this.database.updateChRemovePassword(myUid, chid);
  }

  async updateChSetPassword(myUid: number, chid: number, password: string) {
    await this.database.updateChSetPassword(myUid, chid, password);
  }

  async deleteUserInChannel(targetUid: number, chid: number) {
    await this.database.deleteUserInChannel(targetUid, chid);
  }

  async addUserInChannel(userInChannelDto: UserInChannelDto) {
    await this.database.addUserInChannel(userInChannelDto);
  }
}
