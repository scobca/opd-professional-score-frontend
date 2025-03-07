<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
</script>

<template>
  <button :disabled="disabled" class="wrapper">
    <slot name="placeholder">Button name</slot>
  </button>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  text-align: center;
  background: var(--button-primary);
  transition-duration: 0.2s;
  user-select: none;
}

.wrapper:hover {
  cursor: pointer;
  border: 1px solid var(--button-primary);
  background-color: var(--button-secondary);
  transition-duration: 0.2s;
}

.wrapper[disabled="disabled"]:hover {
  cursor: wait;
}
</style>