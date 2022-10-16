import { UserDataType } from '../atoms/userDataType';

export const sortUserByName = (
  { displayName: first }: UserDataType,
  { displayName: second }: UserDataType,
) => {
  if (first < second) {
    return -1;
  }

  if (first > second) {
    return 1;
  }

  return 0;
};
