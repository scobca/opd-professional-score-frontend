<script setup lang="ts">

import {updateUserState, UserState} from "../utils/userState/UserState.ts";
import {logout} from "../services/auth.ts";
updateUserState()

</script>

<template>
  <header class="header">
    <nav class="nav-container">
      <router-link to="/">
        <img src="../assets/logo_end.png" class="logo" alt="logo"/>
      </router-link>

      <div class="nav-links">
        <div class="auth-buttons" v-if="UserState.status == 'unauthorized'">
          <router-link to="/auth/login" class="btn login">Вход</router-link>
          <router-link to="/auth/registrationFirstStep" class="btn register">Регистрация</router-link>
        </div>
        <div class="auth-buttons" v-if="UserState.status == 'unverified'">
          <router-link to="/auth/registrationSecondStep" class="btn register" @click="logout">Подтвердить почту</router-link>
        </div>
        <div class="auth-buttons" v-if="UserState.status == 'authorized'">
          <router-link to="" class="btn login" @click="logout">Выход</router-link>
          <router-link to="/profile" class="btn register">Личный кабинет</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 1.5rem 5%;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100vw;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.logo {
  width: 11vw;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.login, .logout {
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.login:hover, .logout:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.register, .account {
  background: white;
  color: #1e3c72;
}

.register:hover, .account:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>