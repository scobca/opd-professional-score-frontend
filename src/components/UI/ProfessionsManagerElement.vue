<script setup lang="ts">

import CommonButton from "./CommonButton.vue";
defineProps<{ id: number }>()
defineEmits(['edit-profession'])
</script>

<template>
  <div class="wrapper">
    <div class="id" id="id">#
      <slot name="id">12345</slot>
    </div>
    <a class="prof_name" id="test_name" :href="`/profession/${id}`">
      <slot name="name">Lorem ipsum dolor sit amet.</slot>
    </a>
    <div class="created">
      <slot name="description">Ivanov Ivan Ivanovich</slot>
    </div>
    <div class="created">
      <slot name="requirements">Ivanov Ivan Ivanovich</slot>
    </div>
    <div class="created">
      <slot name="sphere">Ivanov Ivan Ivanovich</slot>
    </div>
    <div class="changeProfession">
      <CommonButton
          @click="$emit('edit-profession', $event.currentTarget)"
          :disabled="false"
      >
        <template v-slot:placeholder>
          <slot name="placeholder">Изменить</slot>
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
  padding: 1vw;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 2fr 4fr 3fr 1fr 1fr;
}

.wrapper:hover {
  cursor: pointer;
}

.wrapper > div,
.wrapper > a {
  border-right: 1px solid black;
  padding: 5px;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
}

#id, #test_name{
  text-align: left;
}

.wrapper > div:last-child {
  border-right: none;
}

.remove {
  scale: 60%;
  transition-duration: 0.2s;
}

.remove:hover {
  scale: 65%;
  transition-duration: 0.2s;
}
</style>