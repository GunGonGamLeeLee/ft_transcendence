import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { ProfileType } from 'src/users/dto/profile.type.dto';
import { ProfileUpdateDto } from 'src/users/dto/profile.update.dto';
import { QueryRunner, Repository } from 'typeorm';
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

  async findOneData(uid: number): Promise<UserEntity> {
    return await this.userRepo.findOne({
      select: {
        uid: true,
        displayName: true,
        imgUri: true,
        rating: true,
        status: true,
      },
      where: { uid },
    });
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

  async findOneSmallProfile(uid: number): Promise<UserEntity> {
    return await this.userRepo.findOne({
      select: {
        displayName: true,
        imgUri: true,
        rating: true,
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

  async saveOne(
    queryRunner: QueryRunner,
    userDto: UserDto | UserEntity,
  ): Promise<UserEntity> {
    const user = this.userRepo.create({
      ...userDto,
      status: UserStatus.OFFLINE,
      gameRoom: '',
    });
    try {
      return await queryRunner.manager.save(user);
    } catch (err) {
      throw new HttpException('already existed name', HttpStatus.FORBIDDEN);
    }
  }

  updateImgFile(filepath: string, filename: string, imgData: any) {
    if (imgData === '') return;
    const base64 = imgData.replace(/^data:image\/\w+;base64,/, '');
    const pngfile = Buffer.from(base64, 'base64');
    fs.writeFileSync(`${filepath}/${filename}.png`, pngfile);
  }

  async updateUser(uid: number, body: ProfileUpdateDto): Promise<ProfileType> {
    const user = await this.findOneProfile(uid);
    this.updateImgFile(`public/img`, `${uid}`, body.imgData);
    if (body.displayName !== '') {
      user.displayName = body.displayName;
    }
    user.mfaNeed = body.mfaNeed;
    try {
      await this.userRepo.update({ uid }, user);
    } catch (err) {
      throw new HttpException('update user error', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async isExistedName(displayName: string): Promise<boolean> {
    const user: UserEntity = await this.findUserByName(displayName);
    return user != null;
  }

  async updateName(uid: number, displayName: string) {
    try {
      await this.userRepo.update({ uid }, { displayName });
    } catch (err) {
      throw new HttpException('already existed name', HttpStatus.FORBIDDEN);
    }
  }

  async updateimgUri(uid: number, imgUri: string) {
    await this.userRepo.update({ uid }, { imgUri });
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

  async updateUserGameRoom(uid: number, gameRoom: string) {
    await this.userRepo.update(
      { uid },
      { gameRoom, status: UserStatus.INGAME },
    );
  }

  async updateUserExitGameRoom(uid: number) {
    await this.userRepo.update(
      { uid },
      { gameRoom: '', status: UserStatus.ONLINE },
    );
  }

  async deleteOne(uid: number) {
    return await this.userRepo.delete({ uid });
  }
}
