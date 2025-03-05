import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionStatsDto} from "./dto/CreateProfessionStats.dto.ts";

export class ProfessionStatisticResolver {
  apiResolver = new ApiResolverUtil('professionStatistic');
  token = localStorage.getItem("token");

  public getOldStats(userId: number, professionId: number) {
    if (this.token != null) {
      return this.apiResolver.request(`getStatsByUserAndProfession/${userId}/${professionId}`, 'GET', null, this.token);
    }
  }

  public createStats(data: CreateProfessionStatsDto[]) {
    if (this.token != null) {
      return this.apiResolver.request('createStats', 'POST', data, this.token)
    }
  }

  public async getProfessionStatistics(id: number) {
        const response = await this.apiResolver.request("getProfessionStatistic", "POST", {
            "id": id
        })
        return response.data;
  }

  public updateStats(data: CreateProfessionStatsDto[]) {
    if (this.token != null) {
      return this.apiResolver.request('updateStats', 'PATCH', data, this.token)
    }
  }
}