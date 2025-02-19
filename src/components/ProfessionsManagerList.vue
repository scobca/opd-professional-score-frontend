<script setup lang="ts">
import {computed, type PropType, ref} from "vue";
import CommonButton from "./UI/CommonButton.vue";
import type {ProfessionsManagerInput} from "../api/dto/professions-manager.input.dto.ts";
import ProfessionsManagerElement from "./UI/ProfessionsManagerElement.vue";

const props = defineProps({
  maxElementsCount: {
    type: Number,
    default: 5,
  },
  professions: {
    type: Array as PropType<ProfessionsManagerInput[]>,
    required: true,
  }
});

const currentPage = ref(1);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.maxElementsCount;
  const end = start + props.maxElementsCount;
  return props.professions.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(props.professions.length / props.maxElementsCount);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="component_container">
    <div class="header">
      <div class="id" id="id">
        Id
      </div>
      <div class="test_name" id="test_name">
        Profession name
      </div>
      <div class="time">Created</div>
      <div class="valid">Delete</div>
    </div>
    <ProfessionsManagerElement
        v-for="item in paginatedData"
        :key="item.id"
    >
      <template #id>{{ item.id }}</template>
      <template #prof_name>{{ item.name }}</template>
      <template #created>{{ item.username }}</template>
    </ProfessionsManagerElement>

    <div class="pagination_controls">
      <CommonButton @click="prevPage">
        <template v-slot:placeholder>Назад</template>
      </CommonButton>

      <span>{{ currentPage }} / {{ totalPages }}</span>

      <CommonButton @click="nextPage">
        <template v-slot:placeholder>Вперед</template>
      </CommonButton>
    </div>
  </div>
</template>

<style scoped>
.component_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.pagination_controls {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-top: 1rem;
  user-select: none;
}

.header {
  background: var(--background-secondary);
  border-radius: 10px;
  width: 95%;
  height: 4rem;
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 2fr 7fr 7fr 1fr;
  margin-bottom: 1rem;
}

.header:hover {
  cursor: pointer;
}

.header > div {
  border-right: 1px solid black;
  padding: 5px;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

#id, #test_name {
  text-align: left;
}

.header > div:last-child {
  border-right: none;
}
</style>