<script lang="ts">
import {usePopupStore} from "../../../store/popup.store.ts";
import eventBus from "../../../store/event-bus.ts";

export default {
  name: 'ErrorPopup',
  data() {
    return {
      popupStore: usePopupStore(),
    }
  },
  methods: {
    onClick() {
      this.popupStore.deactivateErrorPopup();
      eventBus.emit("errorPopupCallback")
    }
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape" && this.popupStore.getErrorPopupVisible) {
        this.onClick()
      }
    })
  },
  unmounted() {
    document.removeEventListener("keydown", (e) => {
      if (e.key == "Escape" && this.popupStore.getErrorPopupVisible) {
       this.onClick()
      }
    })
  }
}

</script>

<template>
  <div class="popup-wrapper" v-if="popupStore.getMessage != ''" @click="onClick">
    <div class="body-popup-wrapper">
      <img src="../../../assets/icons/cross-icon.svg" alt="Check icon" class="icon"/>
      <p class="popup-message">{{ popupStore.getMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.popup-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: white;
  padding: 1rem 0.75rem;
  border-radius: 10px 0 0 10px;
  border-left: 5px solid #da2828;
  min-width: 20vw;
  max-width: 30vw;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}

.body-popup-wrapper {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.icon {
  scale: 55%;
}

.popup-message {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 85%;
  text-align: left;
}
</style>