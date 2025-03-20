<script lang="ts">
import {defineComponent} from 'vue'
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";
import {AuthResolver} from "../api/resolvers/auth/auth.resolver.ts";
import {usePopupStore} from "../store/popup.store.ts";
import type {RegUserFirstStepOutputDto} from "../api/resolvers/auth/dto/output/reg-user-first-step-output.dto.ts";
import CodeVerification from "./CodeVerification.vue";
import type {SendCodeAgainDto} from "../api/resolvers/auth/dto/output/send-code-again-output.dto.ts";
import type {RegUserSecondStepOutputDto} from "../api/resolvers/auth/dto/output/reg-user-second-step-output.dto.ts";

export default defineComponent({
  name: "RegistrationPage",
  components: {CodeVerification, CommonButton, CustomInput},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordCheck: "",
      currentStep: 1,
      authResolver: new AuthResolver(),
      popupStore: usePopupStore(),
    }
  },
  methods: {
    validatePassword() {
      if (this.password == "") {
        this.popupStore.activateErrorPopup("Passwords can't be empty")
      } else if (this.password != this.passwordCheck) {
        this.popupStore.activateErrorPopup("Passwords don't match");
      } else {
        this.registerFirstStep()
      }
    },
    registerFirstStep() {
      const data: RegUserFirstStepOutputDto = {
        email: this.email,
        username: this.username,
      }

      this.authResolver.registrationFirstStep(data).then((res) => {
        if (res) this.currentStep = 2
      })
    },
    registerSecondStep(code: number) {
      const data: RegUserSecondStepOutputDto = {
        userData: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
        code: code
      }
      this.authResolver.registrationSecondStep(data);
    },
    async sendCode() {
      const data: SendCodeAgainDto = {
        email: this.email,
        username: this.username,
        codeType: "AUTH"
      }
      return this.authResolver.sendCodeAgain(data).then(() => {
        this.popupStore.activateInfoPopup("Verification code sent.")
      });
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key == "Enter") {
        if (this.currentStep == 1) {
          this.validatePassword();
        }
      }
    });
  },
  unmounted() {
    document.removeEventListener('keydown', (e) => {
      if (e.key == "Enter") {
        if (this.currentStep == 1) {
          this.validatePassword();
        }
      }
    });
  }
})
</script>

<template>
  <div class="container" v-if="currentStep == 1">
    <h1 class="header">Регистрация</h1>
    <div class="input-container">
      <p>Имя пользователя:</p>
      <custom-input v-model="username" :placeholder="'Введите имя пользователя'" class="form-input"/>
    </div>
    <div class="input-container">
      <p>Электронная почта:</p>
      <custom-input v-model="email" :placeholder="'Введите электронную почту'" class="form-input"/>
    </div>
    <div class="input-container">
      <p>Пароль:</p>
      <custom-input v-model="password" :placeholder="'Введите пароль'" class="form-input" :type="'password'"/>
    </div>
    <div class="input-container">
      <p>Подтверждение пароля:</p>
      <custom-input v-model="passwordCheck" :placeholder="'Подтвердите пароль'" class="form-input" :type="'password'"/>
    </div>
    <div class="auth-links-container">
      <router-link to="/auth/registration">Уже есть аккаунт?</router-link>
    </div>
    <CommonButton class="auth-button" @click="validatePassword">
      <template v-slot:placeholder>Зарегистрироваться</template>
    </CommonButton>
  </div>
  <code-verification v-if="currentStep == 2" @approveCode="registerSecondStep" @sendCode="sendCode">
    <template v-slot:header>Подтверждение регистрации</template>
  </code-verification>
</template>

<style scoped>
.container {
  margin-top: 5rem;
  min-width: 35vw;
  max-width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 100%;

  p {
    font-weight: 500;
  }
}

.form-input {
  height: 2.5rem;
}

.form-input::placeholder {
  font-size: 0.9rem;
}

.auth-links-container {
  display: flex;
  justify-content: left;
  width: 100%;
}

.auth-button, .auth-button:hover {
  width: 100%;
  color: white;
  background-color: #4127e4;
}
</style>