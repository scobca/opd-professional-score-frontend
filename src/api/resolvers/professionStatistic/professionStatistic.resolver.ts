import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionStatsOutputDto} from "./dto/output/create-profession-stats-output.dto.ts";
import type {GetOldStatsOutputDto} from "./dto/output/get-old-stats-output.dto.ts";
import type {GetOldStatsInputDto} from "./dto/input/get-old-stats-input.dto.ts";
import type {DefaultInputDto} from "../../dto/common/default-input.dto.ts";
import type {GetProfessionStatisticsInputDto} from "./dto/input/get-profession-statistics-input.dto.ts";

export class ProfessionStatisticResolver {
  private apiResolver = new ApiResolverUtil('professionStatistic');
  private token = localStorage.getItem("token");

  public async getOldStats(data: GetOldStatsOutputDto) {
    return await this.apiResolver.request<GetOldStatsOutputDto, GetOldStatsInputDto[]>(
      `getStatsByUserAndProfession/${data.userId}/${data.professionId}`,
      "GET"
    )
  }

  public async createStats(data: CreateProfessionStatsOutputDto[]) {
    return await this.apiResolver.request<CreateProfessionStatsOutputDto[], DefaultInputDto<string>>(
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
    return await this.apiResolver.request<CreateProfessionStatsOutputDto[], DefaultInputDto<string>>(
      "updateStats",
      "PATCH",
      data,
      this.token ? this.token : undefined,
    )
  }
}