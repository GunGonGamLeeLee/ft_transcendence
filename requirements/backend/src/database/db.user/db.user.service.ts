import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserEntity, UserStatus } from '../entity/entity.user';

@Injectable()
export class DbUserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(uid: number): Promise<UserEntity> {
    return await this.userRepo.findOneBy({ uid });
  }

  async findOneWithLists(uid: number): Promise<UserEntity> {
    return await this.userRepo.findOne({
      relations: {
        friendList: true,
        blockList: true,
        inChannelList: true,
      },
      where: { uid },
    });
  }

  async saveOne(userDto: UserDto | UserEntity): Promise<void> {
    const user = new UserEntity();
    user.uid = userDto.uid;
    user.displayName = userDto.displayName;
    user.avatarPath = userDto.avatarPath;
    user.rating = userDto.rating;
    user.isRequiredTFA = userDto.isRequiredTFA;
    user.qrSecret = userDto.qrSecret;
    user.userStatus = UserStatus.OFFLINE;
    await this.userRepo.save(user);
  }

  async updateName(uid: number, displayName: string) {
    const user = this.userRepo.findOneBy({ displayName });
    if (user != null) throw new HttpException('already existed name', 403);
    await this.userRepo.update({ uid }, { displayName });
  }

  async updateAvatarPath(uid: number, avatarPath: string) {
    await this.userRepo.update({ uid }, { avatarPath });
  }

  async updateRating(uid: number, rating: number) {
    await this.userRepo.update({ uid }, { rating });
  }

  async updateIsRequiredTFA(uid: number, isRequiredTFA: boolean) {
    await this.userRepo.update({ uid }, { isRequiredTFA });
  }

  async updateUserStatus(uid: number, userStatus: UserStatus) {
    await this.userRepo.update({ uid }, { userStatus });
  }

  async deleteOne(uid: number) {
    await this.userRepo.delete({ uid });
  }
}
