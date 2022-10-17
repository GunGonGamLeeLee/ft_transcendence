import { UserDataType } from './userDataType';

export const enum RoleType {
  OWNER,
  ADMIN,
  USER,
}

export interface ChatUserType extends UserDataType {
  role: RoleType;
}
