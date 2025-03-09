import ApiResolver from "../../../utils/ApiResolver.ts";
import type {DefaultInputDto} from "../../dto/common/default-input.dto.ts";

export class UserResolver {
  private apiResolver = new ApiResolver("user");

  public async changePasswordFirstStep(email: string) {
    return await this.apiResolver.request<{ email: string }, DefaultInputDto<string>>(
      "changePasswordFirstStep",
      "POST",
      { email: email }
    )
  }
}