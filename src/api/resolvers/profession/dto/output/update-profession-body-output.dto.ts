import type {GetProfessionOutputDto} from "./get-profession-output.dto.ts";

export interface UpdateProfessionBodyOutputDto {
  message: string;
  profession: GetProfessionOutputDto;
}