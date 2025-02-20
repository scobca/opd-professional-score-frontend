<script setup lang="ts">

import FlipCard from "../components/FlipCard.vue";

const cardsData = [
  {
    title: "Backend-Разработчик",
    descFront: "Разработчик создает серверные приложения для взаимодействия веб-сайта и базы данных.\n" +
        "       Владение языками программирования, такими как PHP, JavaScript, Java, SQL, Git,\n" +
        "       и понимание принципов работы баз данных — ключевые навыки.",
    descBack: "Навыки: PHP, JavaScript, Java, SQL, Git.\n" +
        "                                Средняя зарплата: от 180 000 руб.",
  },
  {
    title: "Frontend-Разработчик",
    descFront: "Разработчик создает клиентское приложение, внешний вид веб-сайтов.\n" +
        "       Владение технологиями, такими как HTML, CSS, JavaScript, Git,\n" +
        "       и понимание принципов работы взаимодействия пользователя и браузера с содержимым веб-страниц.",
    descBack: "Навыки: HTML, CSS, JavaScript, Git.\n" +
        "                                Средняя зарплата: от 170 000 руб."
  },
  {
    title: "Дизайнер",
    descFront: "Дизайнер создает визуальные концепции, интерфейсы и графику.\n" +
        "       Работа с инструментами, такими как Adobe Photoshop, Figma, и понимание\n" +
        "       основ UX/UI — важные аспекты профессии.",
    descBack: " Навыки: Figma, Adobe Photoshop, Illustrator, UX/UI.\n" +
        "       Средняя зарплата: от 70 000 руб."
  }

]
</script>

<template>
  <section class="professions-section">
    <h2>Популярные профессии</h2>
    <div class="profession-cards-container">
      <FlipCard
        v-for="(card, index) in cardsData"
        :key="index"
        :title="card.title"
        :desc-front="card.descFront"
        :desc-back="card.descBack"
        :icon="'backend.png'"
      />
    </div>
  </section>
</template>

<style scoped>
  .professions-section {
    padding: 60px 20px;
    background-color: #691b9a00; /* Фиолетовый фон */
    color: #fff;
    text-align: center;
  }

  .professions-section h2 {
    font-size: 46px;
    margin-bottom: 40px;
    color: #fff;
  }

  .profession-cards-container {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  }
</style>