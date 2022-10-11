import { UserDataType } from './userDataType';

type roleType = 'owner' | 'admin' | 'user'; // todo

export interface ChatUserType extends UserDataType {
  role: roleType;
  banned: boolean;
  muted: boolean;
}
