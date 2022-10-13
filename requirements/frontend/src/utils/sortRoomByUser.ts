import { DmRoomType } from '../atoms/currRoomState';

export function sortRoomByUser(
  { userDisplayName: first }: DmRoomType,
  { userDisplayName: second }: DmRoomType,
) {
  if (first < second) return -1;
  if (first > second) return 1;
  return 0;
}
