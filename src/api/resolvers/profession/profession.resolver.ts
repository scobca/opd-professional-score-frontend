import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionDto} from "./dto/input/CreateProfession.dto.ts";
import type {UpdateProfessionDto} from "./dto/input/UpdateProfession.dto.ts";

export class ProfessionResolver {
    apiResolver = new ApiResolverUtil('professions');

    public create(data: CreateProfessionDto) {
        this.apiResolver.request("createProfession", "POST", data).then((res) => {
          console.log(res);
        });
      }
  
    public async getAll() {
        const response = await this.apiResolver.request("getAll", "GET", null)
        response.data.sort((a, b) => a.id - b.id)
        return response.data
    }

    public async getById(id: number) {
        const response = await this.apiResolver.request(`getProfessionById/${id}`, "GET", null);
        if ('data' in response && response.data != undefined) return response.data;
    }

    public createPullOfProfessions(data: CreateProfessionDto[]) {
        this.apiResolver.request("createPullOfProfessions", "POST", data).then((res) => {
            return res.body
        })
    }

    public async updateProfession(data: UpdateProfessionDto) {
        const response = await this.apiResolver.request("updateProfession", "PATCH", {
            id: data.id,
            updatedData: {
                name: data.updatedData.name,
                description: data.updatedData.description,
                requirements: data.updatedData.requirements,
                sphere: data.updatedData.sphere,
            }
        })
        return response.message;
    }
}
