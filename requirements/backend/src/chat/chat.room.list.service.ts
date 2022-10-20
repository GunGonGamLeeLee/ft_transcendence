import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ChannelEntity, ChannelMode } from 'src/database/entity/entity.channel';
import { ChannelPasswordDto } from './dto/channel.password.dto';
import * as bcrypt from 'bcrypt';

export class ChatRoomType {
  ownerId: number;
  ownerDisplayName: string;
  title: string;
  roomId: string;
  mode: ChannelMode;
  userCount: number;
}

export interface DmRoomType {
  roomId: string;
  userId: number;
  imgUri: string;
  userDisplayName: string;
}

@Injectable()
export class ChatRoomListService {
  constructor(private readonly database: DatabaseService) {}

  async createRoom(
    chOwnerId: number,
    chName: string,
    mode: ChannelMode,
    password: string,
  ) {
    password = password === undefined ? '' : password;
    return await this.database.addChannel({
      chName,
      chOwnerId,
      mode,
      password,
    });
  }

  async verifyPassword(body: ChannelPasswordDto) {
    const { chid, password } = body;
    const channel = await this.database.findOneChannel(chid);
    return await bcrypt.compare(password, channel.password);
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
      const chatRoom = await this.makeDmRoomType(uic.channel);
      roomList.push(chatRoom);
    }
    return roomList;
  }

  async getAllRoomList(): Promise<ChatRoomType[]> {
    const channels = await this.database.listAllChannelPubPro();
    const roomList: ChatRoomType[] = [];
    for (const channel of channels) {
      const chatRoom = await this.makeChatRoomType(channel);
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
      const chatRoom = await this.makeChatRoomType(uic.channel);
      roomList.push(chatRoom);
    }
    return roomList;
  }

  async getCreatedRoom(channel: ChannelEntity): Promise<ChatRoomType> {
    return await this.makeChatRoomType(channel);
  }

  private async makeChatRoomType(
    channel: ChannelEntity,
  ): Promise<ChatRoomType> {
    return {
      ownerId: channel.chOwner.uid,
      ownerDisplayName: channel.chOwner.displayName,
      title: channel.chName,
      roomId: 'channel' + channel.chid,
      mode: channel.mode,
      userCount: await this.database.CountUserInChannel(channel.chid),
    };
  }

  private async makeDmRoomType(channel: ChannelEntity): Promise<DmRoomType> {
    return {
      roomId: 'channel' + channel.chid,
      userId: channel.chOwner.uid,
      imgUri: (await this.database.findOneUser(channel.chOwner.uid)).imgUri,
      userDisplayName: channel.chOwner.displayName,
    };
  }
}
