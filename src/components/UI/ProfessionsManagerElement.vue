<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <div class="id" id="id">#
      <slot name="id">12345</slot>
    </div>
    <div class="prof_name" id="test_name">
      <slot name="Profession name">Lorem ipsum dolor sit amet.</slot>
    </div>
    <div class="created">
      <slot name="created">Ivanov Ivan Ivanovich</slot>
    </div>
    <div class="remove" @click="$emit('deleteTest')">
      <img src="../../assets/icons/trash_icon.svg" alt="remove_test">
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
  grid-template-columns: 2fr 7fr 7fr 1fr;
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
  text-align: center;
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