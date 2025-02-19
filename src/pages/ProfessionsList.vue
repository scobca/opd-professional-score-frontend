<script setup lang="ts">

import FlipCard from "../components/FlipCard.vue";

const cardsData = [
  {
    title: "Разработчик",
    descFront: "Разработчик создает программное обеспечение, веб-сайты и приложения.\n" +
        "       Владение языками программирования, такими как Python, JavaScript, Java,\n" +
        "       и понимание принципов работы баз данных — ключевые навыки.",
    descBack: "Навыки: Python, JavaScript, Java, SQL, Git.<br>\n" +
        "                                Средняя зарплата: от 80 000 руб."
  },
  {
    title: "Дизайнер",
    descFront: "Дизайнер создает визуальные концепции, интерфейсы и графику.\n" +
        "       Работа с инструментами, такими как Adobe Photoshop, Figma, и понимание\n" +
        "       основ UX/UI — важные аспекты профессии.",
    descBack: " Навыки: Figma, Adobe Photoshop, Illustrator, UX/UI.<br>\n" +
        "       Средняя зарплата: от 70 000 руб."
  },
  {
    title: "Маркетолог",
    descFront: " Маркетолог анализирует рынок, разрабатывает стратегии продвижения\n" +
        "       и управляет рекламными кампаниями. Знание инструментов аналитики,\n" +
        "       SEO и SMM — ключевые навыки.",
    descBack: " Навыки: SEO, SMM, Google Analytics, контекстная реклама.\n " +
        "Средняя зарплата: от 65 000 руб."
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