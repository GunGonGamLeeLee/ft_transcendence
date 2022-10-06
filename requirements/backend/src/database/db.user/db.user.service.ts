import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/entity.user';

@Injectable()
export class DbUserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOneBy({ uid: id });
  }

  async findFriendList(id: number) {
    const user = await this.userRepo.findOne({
      where: { uid: id },
      relations: {
        friendList: true,
      },
    });
    return user;
    // return user.friendList;
  }

  async saveOne(userDto: UserDto | UserEntity): Promise<void> {
    const user = new UserEntity();
    user.uid = userDto.uid;
    user.displayName = userDto.displayName;
    user.avatarPath = userDto.avatarPath;
    user.rating = userDto.rating;
    user.isRequiredTFA = userDto.isRequiredTFA;
    user.qrSecret = userDto.qrSecret;
    await this.userRepo.save(user);
  }
}
