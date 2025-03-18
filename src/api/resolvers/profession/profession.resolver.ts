import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionDto} from "./dto/input/create-profession.dto.ts";
import type {UpdateProfessionDto} from "./dto/input/update-profession.dto.ts";
import type {DefaultInputDto} from "../../dto/common/default-input.dto.ts";
import type {UpdateProfessionBodyOutputDto} from "./dto/output/update-profession-body-output.dto.ts";
import type {CreatePullOfProfessionsBodyOutputDto} from "./dto/output/create-pull-of-professions-body-output.dto.ts";
import type {GetProfessionOutputDto} from "./dto/output/get-profession-output.dto.ts";

export class ProfessionResolver {
  private apiResolver = new ApiResolverUtil('professions');

  public create(data: CreateProfessionDto) {
    this.apiResolver.request("createProfession", "POST", data);
  }

  public async getAll() {
    return await this.apiResolver.request<null, GetProfessionOutputDto[]>(
      "getAll",
      "GET",
    )
  }

  public async getById(id: number) {
    return await this.apiResolver.request<number, GetProfessionOutputDto>(
      `getProfessionById/${id}`,
      "GET",
    ).then((res) => {
      return res;
    })
  }

  public async createPullOfProfessions(data: CreateProfessionDto[]) {
    return await this.apiResolver.request<CreateProfessionDto[], DefaultInputDto<CreatePullOfProfessionsBodyOutputDto>>(
      "createPullOfProfessions",
      "POST",
      data
    )
  }

  public async updateProfession(data: UpdateProfessionDto) {
    return await this.apiResolver.request<UpdateProfessionDto, DefaultInputDto<UpdateProfessionBodyOutputDto>>(
      "updateProfession",
      "PATCH",
      data
    ).then((res) => {
      return res.body.message
    })
  }
}
