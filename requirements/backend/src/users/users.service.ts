import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProfileType } from './dto/profile.type.dto';
import { ProfileUpdateDto } from './dto/profile.update.dto';
import { UserDataType } from './dto/user.data.type.dto';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async me(uid: number) {
    const user = await this.database.findOneUserProfile(uid);
    const profile: ProfileType = {
      ...user,
    };
    return profile;
  }

  async updateme(uid: number, body: ProfileUpdateDto) {
    return await this.database.updateUser(uid, body);
  }

  async friend(uid: number) {
    const friendsInDb = await this.database.listUserFriendWithInfo(uid);
    const friends: UserDataType[] = [];
    for (const f of friendsInDb) {
      friends.push(f.user);
    }
    return friends;
  }

  async blocklist(uid: number) {
    const blocksInDb = await this.database.listUserBlockWithInfo(uid);
    const blocks: UserDataType[] = [];
    for (const b of blocksInDb) {
      blocks.push(b.user);
    }
    return blocks;
  }

  async rank() {
    const rankListInDb = await this.database.listUserRank();
    return rankListInDb;
  }

  async follow(myUid: number, frinedUid: number) {
    return await this.database.addFriend(myUid, frinedUid);
  }

  async unfollow(myUid: number, frinedUid: number) {
    return await this.database.deleteFriendOfUser(myUid, frinedUid);
  }

  async block(myUid: number, blockUid: number) {
    return await this.database.addBlock(myUid, blockUid);
  }

  async unblock(myUid: number, blockUid: number) {
    return await this.database.deleteBlockOfUser(myUid, blockUid);
  }

  async namecheck(displayName: string) {
    return !(await this.database.isExistedName(displayName));
  }

  async match(uid: number, take: number, page: number) {
    return await this.database.listMatchHistoryOfUserWithUserInfo(
      uid,
      take,
      page,
    );
  }
}
