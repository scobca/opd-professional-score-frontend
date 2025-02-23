<script setup lang="ts">
import Button from "../../components/UI/CommonButton.vue";
import {ref} from "vue";
import UserManagerList from "../../components/UserManagerList.vue";
import TestsScoreList from "../../components/TestsScoreList.vue";

let username = "Владимир Фокин"
let email = "scobca18@yandex.ru"

const users = ref([
  { id: 1, username: "john_doe", email: "john.doe@example.com", role: "USER" },
  { id: 2, username: "jane_smith", email: "jane.smith@example.com", role: "ADMIN" },
  { id: 3, username: "mike_johnson", email: "mike.johnson@example.com", role: "MANAGER" },
  { id: 4, username: "lisa_white", email: "lisa.white@example.com", role: "CONSULTANT" },
  { id: 5, username: "david_brown", email: "david.brown@example.com", role: "EXPERT" },
  { id: 6, username: "sarah_davis", email: "sarah.davis@example.com", role: "USER" },
  { id: 7, username: "chris_miller", email: "chris.miller@example.com", role: "ADMIN" },
  { id: 8, username: "patricia_wilson", email: "patricia.wilson@example.com", role: "MANAGER" },
  { id: 9, username: "james_taylor", email: "james.taylor@example.com", role: "CONSULTANT" },
  { id: 10, username: "emily_anderson", email: "emily.anderson@example.com", role: "EXPERT" },
  { id: 11, username: "robert_thomas", email: "robert.thomas@example.com", role: "USER" },
  { id: 12, username: "jessica_jackson", email: "jessica.jackson@example.com", role: "ADMIN" },
  { id: 13, username: "william_harris", email: "william.harris@example.com", role: "MANAGER" },
  { id: 14, username: "mary_clark", email: "mary.clark@example.com", role: "CONSULTANT" },
  { id: 15, username: "charles_lewis", email: "charles.lewis@example.com", role: "EXPERT" }
]);

const testData = ref([
  {id: 1, test_name: 'Test 1', current_points: 80, max_points: 100, time: '00:10:00', valid: true},
  {id: 2, test_name: 'Test 2', current_points: 90, max_points: 100, time: '00:15:00', valid: true},
  {id: 3, test_name: 'Test 3', current_points: 75, max_points: 100, time: '00:12:00', valid: false},
  {id: 4, test_name: 'Test 4', current_points: 60, max_points: 100, time: '00:08:00', valid: true},
  {id: 5, test_name: 'Test 5', current_points: 95, max_points: 100, time: '00:20:00', valid: true},
  {id: 6, test_name: 'Test 6', current_points: 50, max_points: 100, time: '00:05:00', valid: false},
  {id: 7, test_name: 'Test 7', current_points: 85, max_points: 100, time: '00:13:00', valid: true},
  {id: 8, test_name: 'Test 8', current_points: 70, max_points: 100, time: '00:09:00', valid: false},
  {id: 9, test_name: 'Test 9', current_points: 100, max_points: 100, time: '00:25:00', valid: true},
  {id: 10, test_name: 'Test 10', current_points: 40, max_points: 100, time: '00:04:00', valid: false},
  {id: 11, test_name: 'Test 11', current_points: 65, max_points: 100, time: '00:11:00', valid: true},
  {id: 12, test_name: 'Test 12', current_points: 55, max_points: 100, time: '00:07:00', valid: false},
  {id: 13, test_name: 'Test 13', current_points: 78, max_points: 100, time: '00:14:00', valid: true},
  {id: 14, test_name: 'Test 14', current_points: 92, max_points: 100, time: '00:18:00', valid: true},
  {id: 15, test_name: 'Test 15', current_points: 30, max_points: 100, time: '00:03:00', valid: false},
  {id: 16, test_name: 'Test 16', current_points: 23, max_points: 100, time: '00:02:00', valid: false},
]);
</script>

<template>
  <div class="container">
    <div class="user-info">
      <div class="user-data-block">
        <p class="block_header">Информация о пользователе</p>

        <div class="info-block">
          <p class="field_label">Имя пользователя</p>
          <p class="field">{{ username }}</p>
        </div>
        <div class="info-block">
          <p class="field_label">Email</p>
          <p class="field">{{ email }}</p>
        </div>
      </div>
      <div class="buttons_container">
        <Button @click="console.log(1)">
          <template v-slot:placeholder>Сменить пароль</template>
        </Button>
        <Button @click="console.log(2)" class="logout_button">
          <template v-slot:placeholder>Выйти из аккаунта</template>
        </Button>
      </div>
    </div>
    <div class="right-block">
      <div class="tests-info">
        <p class="block_header">Все пользователи</p>
        <div class="test_data_block">
          <UserManagerList :users="users" :max-elements-count="5">
            <template v-slot:placeholder>Написать сообщение</template>
          </UserManagerList>
        </div>
      </div>

      <div class="tests-info">
        <p class="block_header">Недавно пройденные тесты</p>
        <div class="test_data_block">
          <TestsScoreList :tests="testData" :max-elements-count="5"></TestsScoreList>
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

.user-info, .tests-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background-color: var(--background-primary);
  padding: 0.75rem;
  border-radius: 15px;
}

.user-info {
  justify-content: space-between;
}

.right-block {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-data-block {
  padding: 0 10px;
  border-radius: 10px;
  color: rgb(237, 227, 227);
}

.block_header {
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bolder;
  color: rgb(237, 227, 227, 0.9);
}

.info-block {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.field_label {
  font-weight: 600;
}

.buttons_container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.logout_button {
  background-color: var(--danger-button-secondary);
  border-color: var(--danger-button-primary);
  color: white;
}

.logout_button:hover {
  background-color: var(--danger-button-primary);
  border-color: transparent;
  color: white;
}

.test_data_block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>