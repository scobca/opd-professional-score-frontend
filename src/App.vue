<script setup lang="ts">
import Header from "./components/AppHeader.vue";
import PopUp from "./components/PopUp.vue";
import type {CreateProfessionDto} from "./api/dto/create-profession.dto.ts";
import {ProfessionResolver} from "./api/resolvers/profession/profession.resolver.ts";

const professionResolver = new ProfessionResolver()
const professionsData: CreateProfessionDto[] = [
  {
    name: "Backend-Разработчик",
    description: "Разработчик создает серверные приложения для взаимодействия веб-сайта и базы данных. Владение языками программирования, такими как PHP, JavaScript, Java, SQL, Git, и понимание принципов работы баз данных — ключевые навыки.",
    requirements: "Навыки: PHP, JavaScript, Java, SQL, Git. Средняя зарплата: от 180 000 руб.",
    sphere: "IT",
  },
  {
    name: "Frontend-Разработчик",
    description: "Разработчик создает клиентское приложение, внешний вид веб-сайтов. Владение технологиями, такими как HTML, CSS, JavaScript, Git, и понимание принципов работы взаимодействия пользователя и браузера с содержимым веб-страниц.",
    requirements: "Навыки: HTML, CSS, JavaScript, Git. Средняя зарплата: от 170 000 руб.",
    sphere: "IT",
  },
  {
    name: "Дизайнер",
    description: "Дизайнер создает визуальные концепции, интерфейсы и графику. Работа с инструментами, такими как Adobe Photoshop, Figma, и понимание основ UX/UI — важные аспекты профессии.",
    requirements: "Навыки: Figma, Adobe Photoshop, Illustrator, UX/UI. Средняя зарплата: от 70 000 руб.",
    sphere: "IT",
  }
]
professionResolver.createPullOfProfessions(professionsData)


</script>

<template>
  <div class="app_container">
    <Header class="app_header"/>
    <PopUp/>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.app_header {
  width: 100%;
  margin-bottom: 2rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
