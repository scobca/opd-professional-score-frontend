export interface UserDataInputDto {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}