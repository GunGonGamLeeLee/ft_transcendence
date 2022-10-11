import { UserDataType } from './user.data.type.dto';

export interface ProfileType extends UserDataType {
  mfaNeed: boolean;
}
