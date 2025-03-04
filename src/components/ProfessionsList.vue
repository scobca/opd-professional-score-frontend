<script setup lang="ts">

import FlipCard from "./UI/FlipCard.vue";
import {ProfessionResolver} from "../api/resolvers/profession/profession.resolver.ts";
import {onMounted, ref} from "vue";

const cards = ref(null)
const professionResolver: ProfessionResolver = new ProfessionResolver();

onMounted(async () => {
  cards.value = await professionResolver.getAll()
})

</script>

<template>
  <section class="professions-section">
    <h2>Популярные профессии</h2>
    <div class="profession-cards-container" v-if="cards">
      <FlipCard
          v-for="(card, index) in cards"
          :key="index"
          :id="card.id"
          :title="card.name"
          :description="card.description"
          :requirements="card.requirements"
          :sphere="card.sphere"
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