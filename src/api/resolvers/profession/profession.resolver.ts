import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionDto} from "./dto/CreateProfession.dto.ts";

export class ProfessionResolver {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  apiResolver = new ApiResolverUtil('professions');

  public create(data: CreateProfessionDto) {
    if (this.token != null) {
      this.apiResolver.request("createProfession", "POST", data, this.token).then((res) => {
        console.log(res);
      });
    } else {
      console.log("No token");
    }
  }

  public getAll() {
    if (this.token != null) {
      this.apiResolver.request("getAll", "GET", this.token).then((res) => {
        console.log(res);
      })
    }
  }
}
