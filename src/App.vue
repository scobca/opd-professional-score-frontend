<script setup lang="ts">
import Header from "./components/UI/AppHeader.vue";
import InfoPopup from "./components/UI/popups/InfoPopup.vue";
import ErrorPopup from "./components/UI/popups/ErrorPopup.vue";
import {usePopupStore} from "./store/popup.store.ts";

const popupStore = usePopupStore();
</script>

<template>
  <div class="app_container">
    <Header class="app_header"/>
    <div class="popup-container" v-if="popupStore.getInfoPopupVisible">
      <InfoPopup class="popup"/>
    </div>
    <div class="popup-container" v-if="popupStore.getErrorPopupVisible">
      <ErrorPopup class="popup"/>
    </div>
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

.popup-container {
  width: 100%;
  position: absolute;
  top: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
}
</style>
