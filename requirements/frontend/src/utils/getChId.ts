export const getChId = (roomId: string | undefined): number => {
  if (roomId === undefined) return -1;
  return parseInt(roomId.substring(7));
};
