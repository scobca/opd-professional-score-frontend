export interface GetProfessionByIdDto {
  id: number;
  name: string;
  requirements: string;
  sphere: string;
  description: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}