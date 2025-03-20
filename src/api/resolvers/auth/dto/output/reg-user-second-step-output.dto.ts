import type {UserDataOutputDto} from "./user-data-output.dto.ts";

export interface RegUserSecondStepOutputDto {
  userData: UserDataOutputDto;
  code: number;
}