import type {UpdatableProfessionValuesDto} from "./UpdatableProfessionValues.dto.ts";

export interface UpdateProfessionDto {
  id: number;
  updatedData: UpdatableProfessionValuesDto;
}
