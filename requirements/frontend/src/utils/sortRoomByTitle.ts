import { RoomType } from '../atoms/currRoomState';

export function sortRoomByTitle(
  { title: first }: RoomType,
  { title: second }: RoomType,
) {
  if (first < second) return -1;
  if (first > second) return 1;
  return 0;
}
