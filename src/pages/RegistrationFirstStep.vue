<script setup lang="ts">

</script>

<template>
  <main class="form-container">
    <form action="#" method="post" id="sign-up-form">
      <h1>Регистрация</h1>

      <label for="username">Имя пользователя:</label>
      <input type="text" id="username" name="username" placeholder="Введите имя пользователя" required>

      <label for="email">Электронная почта:</label>
      <input type="email" id="email" name="email" placeholder="Введите электронную почту" required>

      <label for="password">Пароль:</label>
      <input type="password" id="password" name="password" placeholder="Введите пароль" required>

      <label for="password-confirm">Подтверждение пароля:</label>
      <input type="password" id="password-confirm" name="password-confirm" placeholder="Подтвердите пароль" required>

      <a href="/auth/login">Уже есть аккаунт?</a>

      <button type="submit">Зарегистрироваться</button>
    </form>
  </main>
</template>

<style scoped>
a{
  margin-bottom: 10px;
}

.form-container {
  margin-top: 15vh;
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