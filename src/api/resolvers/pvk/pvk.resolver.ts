import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreatePvkDto} from "./dto/CreatePvk.dto.ts";

export class PvkResolver {
  apiResolver = new ApiResolverUtil('profChar');
  token = localStorage.getItem("token");

  public async getAll() {
    return await this.apiResolver.request('getAll', 'GET', null)
  }

  public createPullOfProfChar(data: CreatePvkDto[]) {
    this.apiResolver.request("createPullOfProfChar", "POST", data).then((res) => {
      return res.body
    })
  }

  public async getByName(name: string) {
    if (this.token != null) {
      return await this.apiResolver.request(`getByName/${name}`, 'GET', null, this.token)
    }
  }

  public async getProfCharById(id: number) {
    if (this.token != null) {
      return await this.apiResolver.request(`getProfCharById/${id}`, 'GET', null, this.token)
    }
  }
}