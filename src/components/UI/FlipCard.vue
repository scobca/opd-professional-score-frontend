<script setup lang="ts">

import {ref} from "vue";

defineProps<{
  id: number,
  title: string,
  description: string,
  requirements: string,
  sphere: string,
  icon?: string,
}>()

const isFlipped = ref(false)
</script>

<template>
  <div :class="isFlipped ? 'profession-card flipped' : 'profession-card'" @click="isFlipped = !isFlipped">
    <div class="card-inner">
      <div class="card-front">
        <div class="profession-icon" v-if="icon">
          <img :src="`../assets/${icon}`" alt="">
        </div>
        <h3 class="profession-title">{{ title }}</h3>
        <p class="profession-description">
          {{ description }}
        </p>
        <a class="profession-link" :href="`/profession/${id}`">Подробнее</a>
      </div>
      <div class="card-back">
        <h3 class="profession-title">{{ title }}</h3>
        <p class="profession-description">
          {{ requirements }}
        </p>
        <p class="profession-description">
          {{ `Сфера деятельности: ${sphere}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profession-card {
  display: flex;
  width: 20vw;
  height: 45vh;
  perspective: 1000px; /* Для 3D-эффекта */
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.profession-card.flipped .card-inner {
  transform: rotateY(180deg); /* Переворот карточки */
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  backface-visibility: hidden; /* Скрыть обратную сторону */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 25px;
  text-align: center;
  box-sizing: border-box;
}

.card-back {
  transform: rotateY(180deg); /* Обратная сторона */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profession-icon img {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.profession-title {
  font-size: 24px;
  margin: 15px 0;
  color: #11041f; /* Фиолетовый цвет текста */
}

.profession-description {
  overflow: scroll;
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.profession-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4127e4; /* Яркий фиолетовый */
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-top: auto;
}

.profession-link:hover {
  background-color: #4127e4; /* Темный фиолетовый */
}
</style>