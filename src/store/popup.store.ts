import {defineStore} from "pinia";

export const usePopupStore = defineStore('popup', {
  state: () => ({
    infoPopupVisible: false,
    errorPopupVisible: false,
    popupMessage: "",
  }),
  getters: {
    getInfoPopupVisible: state => {
      return state.infoPopupVisible
    },
    getErrorPopupVisible: state => {
      return state.errorPopupVisible
    },
    getMessage: state => {
      return state.popupMessage;
    }
  },
  actions: {
    activateInfoPopup(message: string) {
      this.infoPopupVisible = true;
      this.popupMessage = message;
    },
    deactivateInfoPopup() {
      this.infoPopupVisible = false;
      this.popupMessage = "";
    },

    activateErrorPopup(message: string) {
      this.errorPopupVisible = true;
      this.popupMessage = message;
    },
    deactivateErrorPopup() {
      this.errorPopupVisible = false;
      this.popupMessage = "";
    },
  }
})
