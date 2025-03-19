<script lang="ts">
import {defineComponent, inject} from 'vue'
import {io} from "socket.io-client";

import CustomInput from "./UI/inputs/CustomInput.vue";
import type {PvkOptionStructureDto} from "../api/dto/pvk-option-structure.dto.ts";

export default defineComponent({
  name: "SocketTest",
  components: {CustomInput},
  data() {
    return {
      socket: inject("socket") as ReturnType<typeof io>,
      inputValue: ""
    }
  },
  mounted() {
    this.socket.connect();
  },
  created() {
    this.socket.on('searchResults', (data: PvkOptionStructureDto[]) => {
      return data;
    })
  },
  methods: {
    search(query: string) {
      this.socket.emit('search', query)
    }
  },
  unmounted() {
    this.socket.disconnect();
  }
})
</script>

<template>
  <div class="wrapper">
    <CustomInput @search="search(inputValue)" v-model="inputValue" :placeholder="'Введите сюда название ПВК'"/>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 2rem;
}
</style>