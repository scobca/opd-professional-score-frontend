import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionStatsOutputDto} from "./dto/output/create-profession-stats-output.dto.ts";
import type {GetOldStatsOutputDto} from "./dto/output/get-old-stats-output.dto.ts";
import type {GetOldStatsInputDto} from "./dto/input/get-old-stats-input.dto.ts";
import type {DefaultOutputDto} from "../../dto/common/default-output.dto.ts";
import type {GetProfessionStatisticsInputDto} from "./dto/input/get-profession-statistics-input.dto.ts";

export class ProfessionStatisticResolver {
  apiResolver = new ApiResolverUtil('professionStatistic');
  token = localStorage.getItem("token");

  public async getOldStats(data: GetOldStatsOutputDto) {
    return await this.apiResolver.request<GetOldStatsOutputDto, GetOldStatsInputDto[]>(
      `getStatsByUserAndProfession/${data.userId}/${data.professionId}`,
      "GET"
    )
  }

  public async createStats(data: CreateProfessionStatsOutputDto[]) {
    return await this.apiResolver.request<CreateProfessionStatsOutputDto[], DefaultOutputDto<string>>(
      "createStats",
      "POST",
      data,
      this.token ? this.token : undefined,
    )
  }

  public async getProfessionStatistics(id: number) {
    return await this.apiResolver.request<number, GetProfessionStatisticsInputDto[]>(
      `getProfessionStatistic/${id}`,
      "GET"
    )
  }

  public async updateStats(data: CreateProfessionStatsOutputDto[]) {
    return await this.apiResolver.request<CreateProfessionStatsOutputDto[], DefaultOutputDto<string>>(
      "updateStats",
      "PATCH",
      data,
      this.token ? this.token : undefined,
    )
  }
}