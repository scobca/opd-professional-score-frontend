import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreatePvkDto} from "./dto/CreatePvk.dto.ts";

export class PvkResolver {
    apiResolver = new ApiResolverUtil('profChar');

    public async getAll() {
        return await this.apiResolver.request('getAll', 'GET', null)
    }


    public createPullOfProfChar(data: CreatePvkDto[]) {
        this.apiResolver.request("createPullOfProfChar", "POST", data).then((res) => {
            return res.body
        })
    }

}