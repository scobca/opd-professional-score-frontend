<script setup lang="ts">

import FlipCard from "./UI/FlipCard.vue";
import {ProfessionResolver} from "../api/resolvers/profession/profession.resolver.ts";
import {onMounted, ref} from "vue";
import type {GetProfessionOutputDto} from "../api/resolvers/profession/dto/output/get-profession-output.dto.ts";

const cards = ref<GetProfessionOutputDto[] | null>(null)
const cardsPublished = ref<GetProfessionOutputDto[] | null>(null)
const professionResolver: ProfessionResolver = new ProfessionResolver();

onMounted(async () => {
  cardsPublished.value = []
  cards.value = await professionResolver.getAll()
  cards.value.forEach(card => {
    if (!card.archived) {
      cardsPublished.value.push(card)
    }
  })
})

</script>

<template>
  <section class="professions-section">
    <h2>Популярные профессии</h2>
    <div class="profession-cards-container" v-if="cardsPublished">
      <FlipCard
          v-for="(card, index) in cardsPublished"
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