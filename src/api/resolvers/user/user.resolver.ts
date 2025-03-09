import ApiResolver from "../../../utils/ApiResolver.ts";
import type {DefaultInputDto} from "../../dto/common/default-input.dto.ts";
import type {ChangePasswordSecondStepOutputDto} from "./dto/output/change-password-second-step-output.dto.ts";

export class UserResolver {
  private apiResolver = new ApiResolver("user");

  public async changePasswordFirstStep(email: string) {
    return await this.apiResolver.request<{ email: string }, DefaultInputDto<string>>(
      "changePasswordFirstStep",
      "POST",
      { email: email }
    )
  }

  public async changePasswordSecondStep(data: ChangePasswordSecondStepOutputDto) {
    return await this.apiResolver.request<ChangePasswordSecondStepOutputDto, DefaultInputDto<string>>(
      "changePasswordSecondStep",
      "PATCH",
      data
    )
  }
}