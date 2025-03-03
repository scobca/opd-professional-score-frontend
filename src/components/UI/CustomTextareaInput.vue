<script lang="ts">
export default {
  name: 'CustomTextareaInput',
  props: {
    placeholder: String,
    modelValue: String,
    rows: {
      type: Number,
      default: 5,
    },
  },
}
</script>

<template>
  <textarea class="textarea"
            :placeholder="placeholder"
            :value="modelValue"
            :rows="rows"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<style scoped>
.textarea {
  width: 100%;
  border: 1px solid var(--input-border) !important;
  border-radius: 0.5rem;
  transition-duration: 0.2s;
  background-color: white;
  text-align: left;
  padding: 0.5rem;
  resize: vertical;
}

.textarea::placeholder {
  text-align: left;
  color: rgba(0, 0, 0, 0.7);
}

.textarea:active, .textarea:focus {
  border: 1px solid var(--input-border) !important;
  transition-duration: 0.2s;
}

.textarea:hover {
  border: 1px solid var(--input-border) !important;
  transition-duration: 0.2s;
}
</style>
