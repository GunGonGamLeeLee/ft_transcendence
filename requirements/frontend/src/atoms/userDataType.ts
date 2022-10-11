const enum Status {
  OFFLINE,
  ONLINE,
  GAMING,
}

export interface UserDataType {
  uid: number;
  displayName: string;
  imgUri: string;
  rating: number;
  status: Status;
}
