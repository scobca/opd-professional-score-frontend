<script lang="ts">
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";

export default {
  name: "CodeVerification",
  components: {CommonButton, CustomInput},
  data() {
    return {
      code: ""
    }
  }
}
</script>

<template>
  <div class="container">
    <h1 class="header">
      <slot name="header">Подтверждение электронной почты</slot>
    </h1>

    <div class="input">
      <CustomInput :type="'number'" v-model="code" :min-number="0" :max-number="999999" :max-length="6"
                   :placeholder="'Введите код с почты'"/>
    </div>

    <CommonButton class="button" @click="$emit('approve-code', code)">
      <template v-slot:placeholder>Подтвердить</template>
    </CommonButton>
  </div>
</template>

<style scoped>
.container {
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
}

.input {
  width: 100%;
  height: 2rem;
}

.button, .button:hover {
  width: 100%;
  background-color: #4127e4;
  color: white;
}
</style>