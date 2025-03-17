<script lang="ts">
import {defineComponent, inject} from 'vue'
import {io} from "socket.io-client";

export default defineComponent({
  name: "SocketTest",
  data() {
    return {
      socket: inject("socket") as ReturnType<typeof io>,
    }
  },
  mounted() {
    this.socket.connect();
  },
  created() {
    this.socket.on('searchResults', (data: unknown) => {
      console.log('Результаты:', data)
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
  <div @click="search('query')">Найти что-то</div>
</template>

<style scoped>

</style>