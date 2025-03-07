import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {FullPvkStructureInputDto} from "./dto/input/full-pvk-structure-input.dto.ts";

export class PvkResolver {
  apiResolver = new ApiResolverUtil('profChar');

  public async getAll() {
    return await this.apiResolver.request<null, FullPvkStructureInputDto[]>(
      "getAll",
      "GET"
    )
  }

  public async getByName(name: string) {
    return await this.apiResolver.request<null, FullPvkStructureInputDto>(
      `getByName/${name}`,
      "GET",
    )
  }

  public async getProfCharById(id: number) {
    return await this.apiResolver.request<number, FullPvkStructureInputDto>(
      `getProfCharById/${id}`,
      "GET"
    )
  }
}