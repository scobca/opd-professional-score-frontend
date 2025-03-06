<script setup lang="ts">
  import {login} from "../services/auth.ts";
  import router from "../router/router.ts";
  import {popUpState} from "../utils/popUpState.ts";
  import {updateUserState, UserState} from "../utils/userState/UserState.ts";

  const signIn = async() => {
    const result = await login(UserState)
    if (result.status === 200) {
      localStorage.setItem("token", result.body.token)
      updateUserState()
      await router.push("/profile")
    } else {
      popUpState.value = result.response.data.message;
    }
  }
</script>

<template>
  <main class="form-container">
    <form @submit.prevent="signIn" method="post" id="sign-in-form">
      <h1>Вход</h1>
      <label for="email">Логин:</label>
      <input v-model="UserState.email" type="email" id="email" name="email" placeholder="Введите адрес электронной почты" required>

      <label for="password">Пароль:</label>
      <input v-model="UserState.password" type="password" id="password" name="password" placeholder="Введите пароль" required>

      <div class="auth-links">
<!--        <p >Забыли пароль?</p>-->
        <a href="/auth/registrationFirstStep">Создать аккаунт</a>
      </div>
      <button type="submit">Войти</button>
    </form>
  </main>
</template>

<style scoped>
a{
  margin-bottom: 10px;
}

.form-container {
  margin-top: 20vh;
}

.auth-links {
  display: flex;
  justify-content: space-between;
}

form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px #4127e4;
  width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 95%;
  padding: 10px;
  border: 1px solid #5d558d;
  border-radius: 5px;
  transition: transform 0.3s;
  margin-bottom: 15px;
  font-size: 16px;
}

input::placeholder {
  color: rgba(116, 110, 110, 0.7);
}

/* увеличение ячейки при наведении */
input[type="text"]:hover,
input[type="email"]:hover,
input[type="password"]:hover {
  transform: scale(1.005);
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4127e4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #9a8bf8;
}
</style>