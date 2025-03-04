import ApiResolverUtil from "../../../utils/ApiResolver.ts";
import type {CreateProfessionDto} from "./dto/CreateProfession.dto.ts";

export class ProfessionResolver {
  apiResolver = new ApiResolverUtil('professions');

  public create(data: CreateProfessionDto) {
    const token = localStorage.getItem("token")
    if (token != null) {
      this.apiResolver.request("createProfession", "POST", data, token).then((res) => {
        console.log(res);
      });
    } else {
      console.log("No token");
    }
  }
}