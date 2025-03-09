<script lang="ts">
import {usePopupStore} from "../../../store/popup.store.ts";
import CommonButton from "../CommonButton.vue";

export default {
  name: 'InfoPopup',
  components: {CommonButton},
  data() {
    return {
      popupStore: usePopupStore(),
    }
  },
  methods: {
    onClick() {
      this.popupStore.deactivateInfoPopup();
      this.$emit('popupCallback');
    }
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape" && this.popupStore.getInfoPopupVisible) {
        this.popupStore.deactivateInfoPopup();
      }
    })
  },
  unmounted() {
    document.removeEventListener("keydown", (e) => {
      if (e.key == "Escape" && this.popupStore.getInfoPopupVisible) {
        this.popupStore.deactivateInfoPopup();
      }
    })
  }
}

</script>

<template>
  <div class="popup-wrapper" v-if="popupStore.getMessage != ''">
    <div class="body-popup-wrapper">
      <img src="../../../assets/icons/check-icon.svg" alt="Check icon" class="icon"/>
      <h2>Успешно</h2>
    </div>
    <p class="popup-message">{{ popupStore.getMessage }}</p>
    <CommonButton @click="onClick" class="popup-button">
      <template v-slot:placeholder> Готово </template>
    </CommonButton>
  </div>
</template>

<style scoped>
.popup-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: white;
  padding: 1rem 0.75rem;
  border-radius: 10px;
  width: 30vw;
  box-shadow: 0 4px 2px rgba(0, 0, 0, 0.3);
}

.body-popup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.icon {
  scale: 65%;
  position: absolute;
  right: 25%;
}

.popup-message {
  text-wrap: wrap;
  max-width: 70%;
  text-align: center;
}

.popup-button, .popup-button:hover {
  width: 70%;
  background-color: #4127e4;
  color: white;
}
</style>