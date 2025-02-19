<script setup lang="ts">

import {popUpState} from "../utils/popUpState.ts";
import {ref, watch} from "vue";
const toggle = ref(false)
watch(popUpState, () => {
  toggle.value = popUpState.value !== "";
});
</script>

<template>
  <div @click="popUpState.value = ''" :class="toggle ? 'show' : 'hide'">
    <p>{{ popUpState.value }}</p>
  </div>
</template>

<style scoped>
  div {
    display: flex;
    align-items: center;
    padding: 2vw 5vw;
    position: absolute;
    border-bottom: solid 3px transparent;
    transition: all 0.5s;
    background-color: white;
    top: 15%;
  }

  div.show {
    right: 0;
  }

  div.hide {
    right: -100%;
  }

  div:hover {
    cursor: pointer;
  }
</style>