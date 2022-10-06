export interface UserDto {
  uid: number;
  displayName: string;
  avatarPath: string;
  rating: number;
  twoFactor: boolean;
  qrSecret: string;
}
