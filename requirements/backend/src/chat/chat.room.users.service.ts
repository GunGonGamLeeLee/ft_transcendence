import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';
import { UserDataType } from 'src/users/dto/user.data.type.dto';

export interface UserDataChatType extends UserDataType {
  role: UserRoleInChannel;
}

@Injectable()
export class ChatRoomUsersService {
  constructor(private readonly database: DatabaseService) {}

  async getRoomUsers(chid: number) {
    return {
      inChatRoom: await this.getUsersInChatRoom(chid),
      muteList: await this.getMuteUsersInChatRoom(chid),
      banList: await this.getBanUsersInChatRoom(chid),
    };
  }

  async getUsersInChatRoom(chid: number): Promise<UserDataChatType[]> {
    const uicInDb = await this.database.listUserInChannelWithUserInfo(chid);
    const users: UserDataChatType[] = [];

    for (const uic of uicInDb) {
      const { user } = uic;
      users.push({
        ...user,
        role: uic.role,
      });
    }
    return users;
  }

  async getMuteUsersInChatRoom(chid: number) {
    return await this.database.listMuteUserInChannel(chid);
  }

  async getBanUsersInChatRoom(chid: number) {
    return await this.database.listBanUserInChannel(chid);
  }
}
