<script setup lang="ts">

import CommonButton from "./CommonButton.vue";

defineEmits(["changeRole"])
defineProps<{isDisabled: boolean}>()
</script>

<template>
  <div class="wrapper" ref="reference">
    <div class="id" id="id">#
      <slot name="id">12345</slot>
    </div>
    <div class="username" id="username">
      <slot name="username">Ivanov Ivan Ivanovich</slot>
    </div>
    <div class="email" id="email">
      <slot name="email">example@mail.com</slot>
    </div>
    <div class="role">
      <slot name="role">NULL</slot>
    </div>
    <div class="changeRole">
      <CommonButton
          @click="$emit('changeRole', $event.currentTarget)"
          :disabled="isDisabled"
      >
        <template v-slot:placeholder>
          <slot name="placeholder"></slot>
        </template>
      </CommonButton>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background: var(--background-secondary);
  border-radius: 10px;
  width: 95%;
  height: 4rem;
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 2fr 7fr 7fr 3fr 2fr;
}

.wrapper:hover {
  cursor: pointer;
}

.wrapper > div {
  border-right: 1px solid black;
  padding: 5px;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

#id, #username, #email {
  text-align: left;
}

.wrapper > div:last-child {
  border-right: none;
  padding: 5px;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}
</style>