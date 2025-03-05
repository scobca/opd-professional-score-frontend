<script setup lang="ts">
import Button from "../components/UI/CommonButton.vue";
import {onMounted, ref} from "vue";
import TestsManagerList from "../components/TestsManagerList.vue";
import UserManagerList from "../components/UserManagerList.vue";
import ProfessionsManagerList from "../components/ProfessionsManagerList.vue";
import TestScoreList from "../components/TestsScoreList.vue";
import {UserState} from "../utils/userState/UserState.ts";
import {logout} from "../services/auth.ts";
import {getAllUsers} from "../services/user.ts";
import {popUpState} from "../utils/popUpState.ts";
import {ProfessionResolver} from "../api/resolvers/profession/profession.resolver.ts";


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

const reloadUsers = async () => {
  const result = await getAllUsers();
  if (result.status == 200) {
    users.value = result.body
  } else {
    popUpState.value = result.message;
  }
}

const reloadProfessions = async () => {
  const professionResolver = new ProfessionResolver()
  const result = await professionResolver.getAll();
  if (result.length != 0) {
    professions.value = result.sort((a, b) => a.id - b.id)
  } else {
    popUpState.value = "Error occurred"
  }
}

const tests = ref([
  {id: 1, name: "Тест по основам Python", header: "Проверка знаний основ языка Python", createdAt: "15.03.2024",},
  {id: 2, name: "SQL для аналитиков", header: "Тест на знание SQL запросов для анализа данных", createdAt: "20.04.2024",},
  {id: 3, name: "Основы JavaScript", header: "Проверка базовых знаний JavaScript", createdAt: "05.05.2024",},
  {id: 4, name: "Тестирование REST API", header: "Тест по методам и инструментам тестирования API", createdAt: "10.06.2024",},
  {id: 5, name: "Введение в машинное обучение", header: "Проверка знаний основных концепций машинного обучения", createdAt: "22.07.2024",},
  {id: 6, name: "Безопасность веб-приложений", header: "Тест на знание уязвимостей и методов защиты веб-приложений", createdAt: "01.08.2024",},
  {id: 7, name: "Git для начинающих", header: "Проверка знаний основных команд и принципов работы с Git", createdAt: "18.09.2024",},
  {id: 8, name: "Docker: основы контейнеризации", header: "Тест на понимание принципов работы Docker и контейнеров", createdAt: "25.10.2024",},
  {id: 9, name: "Agile Scrum", header: "Проверка знаний принципов и практик Agile Scrum", createdAt: "03.11.2024",},
  {id: 10, name: "Основы Kubernetes", header: "Тест на знание основных концепций Kubernetes", createdAt: "12.12.2024",},
  {id: 11, name: "Коммуникативные навыки", header: "Оценка навыков эффективного общения в команде", createdAt: "19.01.2025",},
  {id: 12, name: "Управление временем", header: "Тест на знание техник и методов тайм-менеджмента", createdAt: "02.02.2025",},
  {id: 13, name: "Лидерство и мотивация", header: "Оценка лидерских качеств и способности мотивировать команду", createdAt: "10.02.2025",},
  {id: 14, name: "Разрешение конфликтов", header: "Тест на знание стратегий и методов разрешения конфликтных ситуаций", createdAt: "17.02.2025",},
  {id: 15, name: "Навыки презентации", header: "Оценка умения проводить эффективные презентации", createdAt: "24.02.2025",}
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

const professions = ref([
  { id: 1, name: "Software Engineer", username: "john_doe" },
  { id: 2, name: "Project Manager", username: "jane_smith" },
  { id: 3, name: "Data Scientist", username: "mike_johnson" },
  { id: 4, name: "UX Designer", username: "lisa_white" },
  { id: 5, name: "Financial Analyst", username: "david_brown" },
  { id: 6, name: "Marketing Specialist", username: "sarah_davis" },
  { id: 7, name: "HR Manager", username: "chris_miller" },
  { id: 8, name: "Sales Representative", username: "patricia_wilson" },
  { id: 9, name: "Accountant", username: "james_taylor" },
  { id: 10, name: "Research Scientist", username: "emily_anderson" },
  { id: 11, name: "Teacher", username: "robert_thomas" },
  { id: 12, name: "Nurse", username: "jessica_jackson" },
  { id: 13, name: "Chef", username: "william_harris" },
  { id: 14, name: "Lawyer", username: "mary_clark" },
  { id: 15, name: "Architect", username: "charles_lewis" }
]);


onMounted(() => {
  reloadUsers()
  reloadProfessions()
})
</script>

<template>
  <div class="container">
    <div class="user-info">
      <div class="user-data-block">
        <p class="block_header">Информация о пользователе</p>

        <div class="info-block">
          <p class="field_label">Имя пользователя</p>
          <p class="field">{{ UserState.username }}</p>
        </div>
        <div class="info-block">
          <p class="field_label">Email</p>
          <p class="field">{{ UserState.email }}</p>
        </div>
        <div class="info-block">
          <p class="field_label">Role</p>
          <p class="field">{{ UserState.role }}</p>
        </div>
      </div>
      <div class="buttons_container">
        <Button @click="console.log(1)">
          <template v-slot:placeholder>Сменить пароль</template>
        </Button>
        <Button @click="logout" class="logout_button">
          <template v-slot:placeholder>Выйти из аккаунта</template>
        </Button>
      </div>
    </div>
    <div class="right-block">

      <div class="tests-info" v-if="UserState.role == 'ADMIN'">
        <p class="block_header">Все пользователи</p>
        <div class="user_data_block">
          <UserManagerList
              :users="users"
              :max-elements-count="5"
              @users-list-update="reloadUsers"
          >
            <template v-slot:placeholder>Установить роль</template>
          </UserManagerList>
        </div>
      </div>

      <div class="tests-info" v-if="UserState.role == 'EXPERT' || UserState.role == 'ADMIN'">
        <p class="block_header">Все тесты</p>
        <div class="test_data_block">
          <TestsManagerList :tests="tests" :max-elements-count="5"/>
        </div>
      </div>

      <div class="tests-info" v-if="UserState.role == 'EXPERT' || UserState.role == 'ADMIN'">
        <p class="block_header">Все профессии</p>
        <div class="profession_data_block">
          <ProfessionsManagerList
              :professions="professions"
              :max-elements-count="5"
              @professions-list-update="reloadProfessions"
          />
        </div>
      </div>

      <div class="tests-info">
        <p class="block_header">Информация о пройденных тестах</p>
        <div class="test_data_block">
          <TestScoreList :tests="testData" :max-elements-count="5"/>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  width: 95vw;
  height: 80vh;
  background-color: var(--background-primary);
  border-radius: 15px;
  padding: 2vh;
  display: grid;
  grid-template-columns: 2fr 7fr;
  gap: 1rem;
}

.user-info, .tests-info {
  display: flex;
  flex-direction: column;
  background-color: var(--background-primary);
  padding: 0.75rem;
  border-radius: 15px;
  min-height: 75vh;
  overflow: scroll;
}

.user-info {
  justify-content: space-between;
  height: 75vh;
}

.right-block {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
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