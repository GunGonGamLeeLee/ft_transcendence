type Status = 'online' | 'chatting' | 'gaming' | 'offline';

export interface UserDataType {
  uid: number;
  displayName: string;
  imgUri: string;
  rating: number;
  status: Status;
}
