<script setup lang="ts">
import Header from "./components/AppHeader.vue";
import PopUp from "./components/PopUp.vue";
</script>

<template>
  <div class="app_container">
    <Header class="app_header"/>
    <PopUp/>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.app_header {
  width: 100%;
  margin-bottom: 2rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
