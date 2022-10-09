type Status = 'online' | 'chatting' | 'gaming' | 'offline';

export interface UserDataType {
  id: number;
  displayName: string;
  imgUri: string;
  rating: number;
  status: Status;
}
