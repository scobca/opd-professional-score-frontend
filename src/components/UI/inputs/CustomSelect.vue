<script lang="ts">
import type {PropType} from "vue";

export default {
  name: 'CustomSelect',
  props: {
    placeholder: String,
    modelValue: String,
    options: {
      type: Array as PropType<{ value: string; text: string }[]>,
      required: true,
    },
  },
}
</script>

<template>
  <select class="select"
          :value="modelValue"
          @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option value="" disabled selected hidden>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
  </select>
</template>

<style scoped>
.select {
  width: 100%;
  height: 100%;
  border: 1px solid var(--input-border);
  border-radius: 0.5rem;
  transition-duration: 0.2s;
  background-color: white;
  padding: 0.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23000000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
}

.select:active, .select:focus {
  border: 1px solid var(--input-border);
  outline: none;
  transition-duration: 0.2s;
}

.select:hover {
  border: 1px solid var(--input-border);
  transition-duration: 0.2s;
}
</style>
