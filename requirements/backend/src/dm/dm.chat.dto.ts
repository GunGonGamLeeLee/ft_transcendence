import { IsNumber, IsString, Length } from 'class-validator';

export class DmChatDto {
  @IsNumber()
  targetUid: number;
  @IsString()
  @Length(0, 20) // FIXME 테스트로 20자 함.
  msg: string;
}
