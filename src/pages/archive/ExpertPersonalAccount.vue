<script setup lang="ts">
import Button from "../../components/UI/CommonButton.vue";
import {ref} from "vue";
import TestsManagerList from "../../components/TestsManagerList.vue";

let username = "Владимир Фокин"
let email = "scobca18@yandex.ru"

const testData = ref([
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
    <div class="tests-info">
      <p class="block_header">Мои тесты</p>
      <div class="test_data_block">
        <TestsManagerList :tests="testData" :max-elements-count="5"/>
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