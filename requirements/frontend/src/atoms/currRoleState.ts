import { atom } from 'recoil';
import { RoleType } from './chatUserType';

export const currRoleState = atom<RoleType | null>({
  key: 'currRole',
  default: null,
});
