import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findUserByName(displayName: string): Promise<UserEntity> {
    return await this.userRepo.findOneBy({ displayName });
  }

  async findOneProfile(uid: number): Promise<UserEntity> {
    return await this.userRepo.findOne({
      select: {
        uid: true,
        displayName: true,
        imgUri: true,
        rating: true,
        status: true,
        mfaNeed: true,
      },
      where: { uid },
    });
  }

  async findUserRankList() {
    return await this.userRepo.find({
      select: {
        uid: true,
        displayName: true,
        imgUri: true,
        rating: true,
        status: true,
        mfaNeed: true,
      },
      order: {
        rating: {
          direction: 'desc',
        },
      },
      skip: 0,
      take: 10,
    });
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
    const user = this.userRepo.create({
      ...userDto,
      imgUri: 'http://backend/users/img/default_img',
      status: UserStatus.OFFLINE,
    });
    try {
      await this.userRepo.save(user); // TODO 이미 있는 유저? -> 현재는 업데이트 됨.
    } catch (err) {
      throw new HttpException('already existed name', HttpStatus.FORBIDDEN);
    }
  }

  async updateUser(body: UserDto): Promise<UserDto> { //TODO myUid == body.uid
    try {
      await this.userRepo.update({ uid: body.uid }, {
        displayName: body.displayName,
        imgUri: body.imgUri,
        mfaNeed: body.mfaNeed,
      });
    } catch (err) {
      throw new HttpException('update user error', HttpStatus.FORBIDDEN);
    }

    return await this.userRepo.findOneBy({uid: body.uid});
  }

  async isExistedName(displayName: string) {
    const user: UserEntity = await this.findUserByName(displayName);
    return user != null;
  }

  async updateName(uid: number, displayName: string) {
    try {
      await this.userRepo.update({ uid }, { displayName });
    } catch (err) {
      throw new HttpException('already existed name', HttpStatus.FORBIDDEN); // TODO 없는 유저? -> 현재는 무시됨.
    }
  }

  async updateimgUri(uid: number, imgUri: string) {
    await this.userRepo.update({ uid }, { imgUri }); // TODO 없는 유저? -> 현재는 무시됨.
  }

  async updateRating(uid: number, rating: number) {
    await this.userRepo.update({ uid }, { rating });
  }

  async updateIsRequiredTFA(uid: number, mfaNeed: boolean) {
    await this.userRepo.update({ uid }, { mfaNeed });
  }

  async updateUserStatus(uid: number, status: UserStatus) {
    await this.userRepo.update({ uid }, { status });
  }

  async deleteOne(uid: number) {
    return await this.userRepo.delete({ uid });
  }
}
