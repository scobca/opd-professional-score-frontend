<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ProfessionResolver} from "../api/resolvers/profession/profession.resolver.ts";
import CommonButton from "../components/UI/CommonButton.vue";
import {UserState} from "../utils/userState/UserState.ts";
import router from "../router/router.ts";
import {ProfessionStatisticResolver} from "../api/resolvers/professionStatistic/professionStatistic.resolver.ts";
import type {
  GetProfessionStatisticsInputDto
} from "../api/resolvers/professionStatistic/dto/input/get-profession-statistics-input.dto.ts";
import type {GetProfessionOutputDto} from "../api/resolvers/profession/dto/output/get-profession-output.dto.ts";

const props = defineProps<{
  id: number;
}>()

const professionStatisticsResolver = new ProfessionStatisticResolver()
const professionResolver = new ProfessionResolver()

const professionStatistics = ref<GetProfessionStatisticsInputDto[] | null>(null)
const profession = ref<GetProfessionOutputDto | null>(null)

onMounted(async () => {
  try {
    professionStatistics.value = await professionStatisticsResolver.getProfessionStatistics(props.id)
  } catch (e) {
    console.error(e)
  }
  profession.value = await professionResolver.getById(props.id) as GetProfessionOutputDto
})

const filteredItems = (items: GetProfessionStatisticsInputDto[]) => {
  return items.filter(item => {
    return item.averageScore != 0
  }).sort((a, b) => b.averageScore - a.averageScore).slice(0, 5);
}

</script>

<template>
  <main>
    <section class="profession" v-if="profession">
      <div class="short-info">
        <h3 class="name">{{ profession.name }}</h3>
        <p class="description">{{ `Описание: ${profession.description}` }}</p>
        <p class="requirements">{{ `Требования: ${profession.requirements}` }}</p>
        <p class="sphere">{{ `Сфера деятельности: ${profession.sphere}` }}</p>
      </div>
      <div class="qualities" v-if="professionStatistics">
        <h3>Профессионально-важные качества</h3>
        <div class="quality">
          <p class="name">Качество</p>
          <p class="rating">Рейтинг</p>
        </div>
        <div class="quality"
             v-for="(statistics) in filteredItems(professionStatistics)"
             :key="statistics.pcId"
        >
          <p class="name">{{ statistics.pcDescription }}</p>
          <p class="rating">{{ statistics.averageScore }}</p>
        </div>
        <CommonButton
            v-if="UserState.role == 'ADMIN' || UserState.role == 'EXPERT'"
            @click="router.push(`/profession/setup/${id}`)"
            :disabled="false"
        >
          <template v-slot:placeholder>
            <slot name="placeholder">Изменить ПВК</slot>
          </template>
        </CommonButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profession {
  display: grid;
  grid-template-columns: 25vw auto;
  gap: 2vw;
  padding: 2vw;
  height: 75vh;
  width: 85vw;
  background-color: var(--background-primary);
  border-radius: 15px;

}

.profession button {
  margin-top: auto;
}

.profession div {
  background-color: var(--background-secondary);
  padding: 1vw;
  border-radius: 10px;
}

.profession .short-info {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.profession .short-info h3 {
  margin-bottom: 1vw;
}

.profession .image img {
  width: 100%;
}

.profession .qualities {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.qualities h3 {
  margin-bottom: 1vw;
}

.quality {
  margin-bottom: 1vw;
  display: grid;
  grid-template-columns: 9fr 1fr;
}

.quality p {
  display: flex;
  align-items: center;
  border-right: solid 2px black;
  box-sizing: border-box;
  justify-content: center;
  width: 100%;
}

.quality p:first-child {
  justify-content: flex-start;
  border-left: solid 2px black;
  text-wrap: pretty;
  padding: 0 1vw;
}
</style>