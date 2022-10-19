import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserInChannelDto } from 'src/database/dto/user.in.channel.dto';
import {
  UserInChannelEntity,
  UserRoleInChannel,
} from 'src/database/entity/entity.user.in.channel';
import { UserDataChatType } from './chat.room.users.service';
import { ChannelUpdateDto } from './dto/channel.update.dto';

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

  async updateChannel(uid: number, channelDto: ChannelUpdateDto) {
    return await this.database.updateChannel(uid, channelDto);
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

  async addUserInChannel(
    userInChannelDto: UserInChannelDto,
  ): Promise<UserDataChatType> {
    return await this.database.addUserInChannel(userInChannelDto);
  }

  async listBanUserInChannel(chid: number): Promise<UserInChannelEntity[]> {
    return await this.database.listBanUserInChannel(chid);
  }

  async listMuteUserInChannel(chid: number): Promise<UserInChannelEntity[]> {
    return await this.database.listMuteUserInChannel(chid);
  }

  async isInBlockList(fromUid: number, toUid: number): Promise<boolean> {
    const blockList = await this.database.listUserBlock(fromUid);
    for (const block of blockList) {
      if (block.toUid == toUid) return true;
    }
    return false;
  }
}
