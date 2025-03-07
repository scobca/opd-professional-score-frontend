import type {UpdatableProfessionValuesDto} from "./updatable-profession-values.dto.ts";

export interface UpdateProfessionDto {
  id: number;
  updatedData: UpdatableProfessionValuesDto;
}
