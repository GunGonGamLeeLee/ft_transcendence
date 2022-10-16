import { UserDataType } from '../atoms/userDataType';

export const sortUserByUid = (
  { uid: first }: UserDataType,
  { uid: second }: UserDataType,
) => {
  if (first < second) {
    return -1;
  }

  if (first > second) {
    return 1;
  }

  return 0;
};
