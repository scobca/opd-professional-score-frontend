<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <div class="id" id="id">#
      <slot name="id">0</slot>
    </div>
    <div class="test_name" id="test_name">
      <slot name="test_name">Lorem ipsum dolor sit amet.</slot>
    </div>
    <div class="score"><slot name="current_points">0</slot>/<slot name="max_points">100</slot></div>
    <div class="time"><slot name="time">00:00:00</slot></div>
    <div class="valid"><slot name="valid">true</slot></div>
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
  grid-template-columns: 1fr 7fr 2fr 2fr 1fr;
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

#id, #test_name {
  text-align: left;
}

.wrapper > div:last-child {
  border-right: none;
}
</style>