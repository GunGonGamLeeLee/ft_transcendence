import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { UserInChannelDto } from 'src/database/dto/user.in.channel.dto';
import { UserStatus } from 'src/database/entity/entity.user';
import { UserRoleInChannel } from 'src/database/entity/entity.user.in.channel';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class DmService {
  constructor(
    private readonly authService: AuthService,
    private readonly database: DatabaseService,
    private dataSource: DataSource,
  ) {}

  async addDmLog(
    queryRunner: QueryRunner,
    fromUid: number,
    toUid: number,
    msg: string,
  ) {
    await this.database.addDmLog(queryRunner, {
      fromUid,
      toUid,
      msg,
      time: new Date(),
    });
  }

  async addDmRoom(fromUid: number, toUid: number) {
    const user: UserInChannelDto = {
      uid: fromUid,
      chid: (await this.database.findOneDmChannelByOwnerId(toUid)).chid,
      role: UserRoleInChannel.USER,
      isMute: false,
      isBan: false,
    };
    await this.database.addUserInChannel(user);
  }

  async validateUser(token: string) {
    const { id } = this.authService.verify(token);
    await this.updateUserStatus(id, UserStatus.ONLINE);
    const user = await this.getUser(id);
    return user;
  }

  async getUser(uid: number) {
    return await this.database.findOneUser(uid);
  }

  async updateUserStatus(uid: number, status: UserStatus) {
    return await this.database.updateUserStatus(uid, status);
  }

  async updateUserRating(uid: number, rating: number) {
    return await this.database.updateUserRating(uid, rating);
  }

  async getFriendList(uid: number) {
    return await this.database.listUserFriendWithInfo(uid);
  }

  async getFollowerList(uid: number) {
    return await this.database.listUserFollowerWithInfo(uid);
  }

  async getChannelsOfUser(uid: number) {
    return await this.database.listChannelOfUser(uid);
  }

  async deleteDmRoom(fromUid: number, toUid: number) {
    const targetChid = (await this.database.findOneDmChannelByOwnerId(toUid))
      .chid;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.database.deleteUserInChannel(queryRunner, fromUid, targetChid);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new WsException('????????? ????????? ??????');
    } finally {
      await queryRunner.release();
    }
  }
}
