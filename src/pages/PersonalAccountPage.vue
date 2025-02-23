<script setup lang="ts">
import CommonButton from "../components/UI/CommonButton.vue";
import {jwtState} from "../utils/jwtState.ts";

const username = "scobca"
const email = "scobca18@yandex.ru"

const redirectToChangingPass = () => {
  console.log("redirectToChangingPass");
}

const redirectToUpdateProfile = () => {
  console.log("redirectToUpdateProfile");
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData')
  jwtState.value = null
}
</script>

<template>
  <div class="container">
    <div class="user-container">
      <div class="user-data">
        <p class="user-data-header">Информация о пользователе</p>

        <div class="user-data-block">
          <p class="user-data-block-title title">Имя пользователя</p>
          <p class="user-data-block-field">{{ username }}</p>
        </div>
        <div class="user-data-block">
          <p class="user-data-block-title">Эл. почта</p>
          <p class="user-data-block-field">{{ email }}</p>
        </div>
      </div>

      <div class="buttons-container">
        <CommonButton @click="redirectToUpdateProfile">
          <template v-slot:placeholder>Редактировать профиль</template>
        </CommonButton>
        <CommonButton @click="redirectToChangingPass">
          <template v-slot:placeholder>Сменить пароль</template>
        </CommonButton>
        <CommonButton @click="logout" class="logout-button">
          <template v-slot:placeholder>Выйти из аккаунта</template>
        </CommonButton>
      </div>
    </div>

    <div class="information-blocks-container">
      <div class="information-block">
        <p class="information-block-header">Заголовок блока</p>
        <div class="information-data-block">
          Таблицы с данными
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 95vw;
  height: 75vh;
  background-color: var(--background-primary);
  border-radius: 15px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 2fr 7fr;
  gap: 1rem;
}

.user-container, .information-blocks-container {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background-color: var(--background-primary);
  padding: 0.75rem;
  border-radius: 15px;
  overflow: scroll;
}

.user-container {
  justify-content: space-between;
}

.user-data {
  padding: 0 10px;
  border-radius: 10px;
  color: rgb(237, 227, 227);
}

.user-data-header, .information-block-header {
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bolder;
  color: rgb(237, 227, 227, 0.9);
}

.user-data-block {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.user-data-block-title {
  font-weight: 600;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.logout-button {
  background-color: var(--danger-button-secondary);
  border-color: var(--danger-button-primary);
  color: white;
}

.logout-button:hover {
  background-color: var(--danger-button-primary);
  border-color: transparent;
  color: white;
}

.information-data-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>