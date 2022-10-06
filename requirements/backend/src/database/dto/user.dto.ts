export interface UserDto {
  uid: number;
  displayName: string;
  avatarPath: string;
  rating: number;
  isRequiredTFA: boolean;
  qrSecret: string;
}
