import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionDto} from "./dto/CreateProfession.dto.ts";

export class ProfessionResolver {
    apiResolver = new ApiResolverUtil('professions');

    public create(data: CreateProfessionDto) {
        this.apiResolver.request("createProfession", "POST", data).then((res) => {
          console.log(res);
        });
      }
  
    public async getAll() {
        const response = await this.apiResolver.request("getAll", "GET")
        response.data.sort((a, b) => a.id - b.id)
        return response.data
    }

    public async getById(id: number) {
        const response = await this.apiResolver.request("getProfessionById", "POST", {
            "id": id,
        });
        return response.data;
    }

    public createPullOfProfessions(data: CreateProfessionDto[]) {
        this.apiResolver.request("createPullOfProfessions", "POST", data).then((res) => {
            return res.body
        })
    }

    public async updateProfession(data) {
        const response = await this.apiResolver.request("updateProfession", "PATCH", {
            "id": data.id,
            "updatedData": {
                "name": data.name,
                "description": data.description,
                "requirements": data.requirements,
                "sphere": data.sphere,
            }
        })
        return response.message;
    }
}
