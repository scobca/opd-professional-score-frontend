<script lang="ts">
import {defineComponent} from 'vue'
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";
import {AuthResolver} from "../api/resolvers/auth/auth.resolver.ts";
import type {LoginUserOutputDto} from "../api/resolvers/auth/dto/output/login-user-output.dto.ts";

export default defineComponent({
  name: "LogInPage",
  components: {CommonButton, CustomInput},
  data() {
    return {
      email: "",
      password: "",
      authResolver: new AuthResolver(),
    }
  },
  methods: {
    login() {
      const data: LoginUserOutputDto = {
        email: this.email,
        password: this.password
      };
      this.authResolver.login(data)
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key == "Enter") {
        this.login()
      }
    });
  },
  unmounted() {
    document.removeEventListener('keydown', (e) => {
      if (e.key == "Enter") {
        this.login()
      }
    })
  }
})
</script>

<template>
  <div class="container">
    <h1 class="header">Вход</h1>
    <div class="input-container">
      <p>Логин:</p>
      <custom-input v-model="email" :placeholder="'Введите адрес электронной почты'" class="form-input"/>
    </div>
    <div class="input-container">
      <p>Пароль:</p>
      <custom-input v-model="password" :placeholder="'Введите пароль'" class="form-input" :type="'password'"/>
    </div>
    <div class="auth-links-container">
      <router-link to="/auth/changePassword">Забыли пароль?</router-link>
      <router-link to="/auth/registrationFirstStep">Создать аккаунт</router-link>
    </div>
    <CommonButton class="auth-button" @click="login">
      <template v-slot:placeholder>Войти</template>
    </CommonButton>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20vh;
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

.auth-links-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.auth-button, .auth-button:hover {
  width: 100%;
  color: white;
  background-color: #4127e4;
}
</style>