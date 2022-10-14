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
      this.database.updateUserStatus(id, UserStatus.ONLINE);
      return { user: await this.database.findOneUser(id) };
    } catch (e) {
      console.log(e);
      return { user: null };
    }
  }

  async getFriendList(uid: number) {
    return await this.database.listUserFriendWithInfo(uid);
  }
}
