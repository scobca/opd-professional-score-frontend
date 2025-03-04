import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionDto} from "../../dto/create-profession.dto.ts";

export class ProfessionResolver {
    apiResolver = new ApiResolverUtil('professions');

    public async getAll() {
        const response = await this.apiResolver.request("getAll", "GET")
        return response.data;
    }

    public createPullOfProfessions(data: CreateProfessionDto[]) {
        this.apiResolver.request("createPullOfProfessions", "POST", data).then((res) => {
            return res.body
        })
    }
}