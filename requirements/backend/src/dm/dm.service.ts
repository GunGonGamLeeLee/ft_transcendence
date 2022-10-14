import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { UserStatus } from 'src/database/entity/entity.user';

@Injectable()
export class DmService {
  constructor(
    private readonly authService: AuthService,
    private readonly database: DatabaseService,
  ) {}

  async validateUser(token: string) {
    try {
      const { id } = this.authService.verify(token);
      await this.updateUserStatus(id, UserStatus.ONLINE);
      return { user: await this.getUser(id) };
    } catch (e) {
      console.log(e);
      return { user: null };
    }
  }

  async getUser(uid: number) {
    return await this.database.findOneUser(uid);
  }

  async updateUserStatus(uid: number, status: UserStatus) {
    return await this.database.updateUserStatus(uid, status);
  }

  async getFriendList(uid: number) {
    return await this.database.listUserFriendWithInfo(uid);
  }

  async getFollowerList(uid: number) {
    return await this.database.listUserFollowerWithInfo(uid);
  }
}
