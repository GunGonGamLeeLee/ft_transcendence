import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ChannelEntity, ChannelMode } from 'src/database/entity/entity.channel';

export class ChatRoomType {
  ownerId: number;
  onwerDisplayName: string;
  title: string;
  roomId: string;
  mode: ChannelMode;
  userCount: number;
}

export interface DmRoomType {
  roomId: string;
  userId: number;
  userDisplayName: string;
}

@Injectable()
export class ChatRoomListService {
  constructor(private readonly database: DatabaseService) {}

  async verifyPassword(chid: number, password: string) {
    const channel = await this.database.findOneChannel(chid);
    if (channel.password != password)
      throw new HttpException('일치하지 않습니다.', HttpStatus.FORBIDDEN);
  }

  async getRoomList(uid: number) {
    return {
      allRoom: await this.getAllRoomList(),
      inRoom: await this.getInRoomList(uid),
      dmRoom: await this.getDmRoomList(uid),
    };
  }

  async getDmRoomList(uid: number): Promise<DmRoomType[]> {
    const channels = await this.database.listUserDmChannel(uid);
    const roomList: DmRoomType[] = [];
    for (const uic of channels) {
      const chatRoom = this.makeDmRoom(uic.channel);
      roomList.push(chatRoom);
    }
    return roomList;
  }

  async getAllRoomList(): Promise<ChatRoomType[]> {
    const channels = await this.database.listAllChannelPubPro();
    const roomList: ChatRoomType[] = [];
    for (const channel of channels) {
      const chatRoom = await this.makeChatRoom(channel);
      roomList.push(chatRoom);
    }
    return roomList;
  }

  async getInRoomList(uid: number): Promise<ChatRoomType[]> {
    const userInChannels = await this.database.listChannelOfUserWithChannelInfo(
      uid,
    );
    const roomList: ChatRoomType[] = [];
    for (const uic of userInChannels) {
      const chatRoom = await this.makeChatRoom(uic.channel);
      roomList.push(chatRoom);
    }
    return roomList;
  }

  private async makeChatRoom(channel: ChannelEntity) {
    return {
      ownerId: channel.chOwner.uid,
      onwerDisplayName: channel.chOwner.displayName,
      title: channel.chName,
      roomId: 'channel' + channel.chid,
      mode: channel.mode,
      userCount: await this.database.CountUserInChannel(channel.chid),
    };
  }

  private makeDmRoom(channel: ChannelEntity): DmRoomType {
    return {
      roomId: 'channel' + channel.chid,
      userId: channel.chOwner.uid,
      userDisplayName: channel.chOwner.displayName,
    };
  }
}
