import ApiResolverUtil from "../../../utils/ApiResolver.ts";

export class PvkResolver {
  apiResolver = new ApiResolverUtil('profChar');
  token = localStorage.getItem("token");

  public async getAll() {
    if (this.token != null) {
      return await this.apiResolver.request('getAll', 'GET', null, this.token)
    }
  }

  public async getByName(name: string) {
    if (this.token != null) {
      return await this.apiResolver.request(`getByName/${name}`, 'GET', null, this.token)
    }
  }
}