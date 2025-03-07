<script setup lang="ts">
import Header from "./components/UI/AppHeader.vue";
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
  padding-bottom: 2rem;
}

.app_header {
  width: 100%;
  margin-bottom: 2rem;
}
</style>
