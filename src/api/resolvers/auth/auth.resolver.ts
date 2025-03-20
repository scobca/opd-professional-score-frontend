import ApiResolver from "../../../utils/ApiResolver.ts";
import type {LoginUserOutputDto} from "./dto/output/login-user-output.dto.ts";
import type {DefaultInputDto} from "../../dto/common/default-input.dto.ts";
import type {RegUserFirstStepOutputDto} from "./dto/output/reg-user-first-step-output.dto.ts";
import type {AuthUserInputDto} from "./dto/input/auth-user-input.dto.ts";
import {usePopupStore} from "../../../store/popup.store.ts";
import type {DefaultErrorDto} from "../../dto/common/default-error.dto.ts";
import {updateUserState} from "../../../utils/userState/UserState.ts";
import {useRouter} from "vue-router";
import type {SendCodeAgainDto} from "./dto/output/send-code-again-output.dto.ts";
import type {RegUserSecondStepOutputDto} from "./dto/output/reg-user-second-step-output.dto.ts";
import router from "../../../router/router.ts";

export class AuthResolver {
  private apiResolver = new ApiResolver('auth');
  private popupStore = usePopupStore();
  private router = useRouter();

  public async login(data: LoginUserOutputDto) {
    return await this.apiResolver.request<LoginUserOutputDto, DefaultInputDto<AuthUserInputDto>>(
      "login",
      "POST",
      data,
    ).then((res) => {
      localStorage.setItem("token", res.body.token);
      updateUserState()

      this.popupStore.activateInfoPopup("Login successfully")
      this.router.push('/profile');
    }).catch((err) => {
      const e = (err.response.data) as DefaultErrorDto;
      this.popupStore.activateErrorPopup(`Error code: ${e.status}. ${e.message}`)
    })
  }

  public async logout() {
    localStorage.removeItem('token');
    updateUserState()
    await router.push('/')
  }

  public async registrationFirstStep(data: RegUserFirstStepOutputDto) {
    return await this.apiResolver.request<RegUserFirstStepOutputDto, DefaultInputDto<string>>(
      "registrationFirstStep",
      "POST",
      data,
    ).then(() => {
      return true;
    }).catch((err) => {
      const e = (err.response.data) as DefaultErrorDto;
      this.popupStore.activateErrorPopup(`Error code: ${e.status}. ${e.message}`);

      return false;
    })
  }

  public async registrationSecondStep(data: RegUserSecondStepOutputDto) {
    return await this.apiResolver.request<RegUserSecondStepOutputDto, DefaultInputDto<AuthUserInputDto>>(
      "register",
      "POST",
      data,
    ).then((res) => {
      localStorage.setItem("token", res.body.token);
      updateUserState()

      this.popupStore.activateInfoPopup("Register successfully")
      this.router.push('/profile');
    }).catch((err) => {
      const e = (err.response.data) as DefaultErrorDto;
      this.popupStore.activateErrorPopup(`Error code: ${e.status}. ${e.message}`);
    })
  }

  public async sendCodeAgain(data: SendCodeAgainDto) {
    return await this.apiResolver.request<SendCodeAgainDto, void>(
      "sendCodeAgain",
      "POST",
      data,
    )
  }
}