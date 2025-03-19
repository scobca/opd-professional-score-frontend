export interface DefaultErrorDto {
  status: number;
  message: string;
  cause: string | null;
}