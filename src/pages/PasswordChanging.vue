<script lang="ts">
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";
import {UserResolver} from "../api/resolvers/user/user.resolver.ts";
import CodeVerification from "./CodeVerification.vue";
import router from "../router/router.ts";
import {usePopupStore} from "../store/popup.store.ts";

export default {
  name: 'PasswordChangingPage',
  components: {CodeVerification, CommonButton, CustomInput},
  data() {
    const userResolver = new UserResolver();
    return {
      step: 1,
      email: "",
      password: "",
      passwordCheck: "",
      userResolver,
      popupStore: usePopupStore(),
    }
  },
  methods: {
    goToFirstStep() {
      this.email = "";
      this.step = 1;
    },

    goToSecondStep() {
      if (this.email == "") {
        this.popupStore.activateErrorPopup("Please enter a valid email")
      } else this.step = 2;
    },

    checkPassword() {
      if (this.password != this.passwordCheck || this.password == "") {
        this.popupStore.activateErrorPopup("Пароли не совпадают")
      } else {
        this.userResolver.changePasswordFirstStep(this.email).then((result) => {
          if (result.status == 200) {
            this.step = 3;
          }
        }).catch((err) => {
          this.popupStore.activateErrorPopup(err.response.data.message)
        });
      }
    },

    approveCode(code: string) {
      const data = {
        email: this.email,
        code: parseInt(code),
        password: this.password,
      }
      this.userResolver.changePasswordSecondStep(data).then((result) => {
        if (result.status == 200) {
          localStorage.removeItem("token");
          router.push('/');
          this.popupStore.activateInfoPopup(result.body)
        }
      }).catch((err) => {
        this.popupStore.activateErrorPopup(err.response.data.message)
      })
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key == "Enter") {
        if (this.step == 1) {
          this.goToSecondStep();
        } else if (this.step == 2) {
          this.checkPassword();
        }
      }

      if (e.key == "Escape" && this.step == 2) {
        this.goToFirstStep();
      }
    });
  },
  unmounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key == "Enter") {
        if (this.step == 1) {
          this.goToSecondStep();
        } else if (this.step == 2) {
          this.checkPassword();
        }
      }

      if (e.key == "Escape" && this.step == 2) {
        this.goToFirstStep();
      }
    });
  }
}

</script>

<template>
  <div class="container" v-if="step == 1">
    <h1 class="header">Изменение пароля</h1>
    <label class="email-label">Введите электронную почту, на которую зарегистрирован Ваш аккаунт</label>
    <div class="input-block">
      <CustomInput v-model="email" :placeholder="'Эл. почта'"/>
    </div>
    <CommonButton class="button" @click="goToSecondStep" @keyup.enter="goToSecondStep">
      <template v-slot:placeholder>Продолжить</template>
    </CommonButton>
  </div>

  <div class="container" v-if="step == 2">
    <div class="header-container">
      <img class="icon" src="../assets/icons/arrow-left-icon.svg" alt="arrow-back" @click="goToFirstStep">
      <h1 class="container-header">Изменение пароля</h1>
    </div>
    <div class="input-wrapper">
      <div class="input-block">
        <CustomInput :placeholder="'Введите новый пароль'" v-model="password" :type="'password'"/>
      </div>
      <div class="input-block">
        <CustomInput :placeholder="'Подтвердите новый пароль'" v-model="passwordCheck" :type="'password'"/>
      </div>
    </div>
    <CommonButton class="button" @click="checkPassword">
      <template v-slot:placeholder>Установить новый пароль</template>
    </CommonButton>
  </div>

  <CodeVerification v-if="step == 3" @approve-code="approveCode">
    <template v-slot:header>Изменение пароля</template>
  </CodeVerification>
</template>

<style scoped>
.container {
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 30vw;
  padding: 1.5rem;
  border-radius: 10px;
  background: white;
}

.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}


.icon, .icon:hover {
  position: absolute;
  left: -2%;
  scale: 70%;
  cursor: pointer;
}

.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-block {
  height: 2rem;
  width: 100%;
}

.button, .button:hover {
  width: 100%;
  background-color: #4127e4;
  color: white;
}

.email-label {
  text-align: center;
}
</style>