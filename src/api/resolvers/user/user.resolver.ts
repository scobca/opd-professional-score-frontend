import ApiResolver from "../../../utils/ApiResolver.ts";
import type {DefaultInputDto} from "../../dto/common/default-input.dto.ts";
import type {ChangePasswordSecondStepOutputDto} from "./dto/output/change-password-second-step-output.dto.ts";
import type {UserDataInputDto} from "./dto/input/user-data-input.dto.ts";
import {usePopupStore} from "../../../store/popup.store.ts";
import type {DefaultErrorDto} from "../../dto/common/default-error.dto.ts";

export class UserResolver {
  private apiResolver = new ApiResolver("user");
  private popupStore = usePopupStore();

  public async getByEmail(email: string) {
    return await this.apiResolver.request<null, DefaultInputDto<UserDataInputDto>>(
      `getUserByEmail/${email}`,
      "GET",
    ).catch((err) => {
      const e = (err.response.data) as DefaultErrorDto;
      this.popupStore.activateErrorPopup(`Error code: ${e.status}. ${e.message}`);
      return null;
    })
  }

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