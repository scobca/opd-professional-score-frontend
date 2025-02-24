<script setup lang="ts">
import type {UserRole} from "../utils/userState/UserState.types.ts";
import {setRole} from "../services/user.ts";
import {popUpState} from "../utils/popUpState.ts";

const props = defineProps<{
  userId: number;
  userRole: UserRole;
}>()
const roles: UserRole[] = [
    "ADMIN", "EXPERT", "CONSULTANT", "USER", "MODERATOR"
]

const updateRole = async () => {
  const result = await setRole(props.userId, props.userRole);
  popUpState.value = result.body;
}
</script>

<template>
  <form @submit.prevent="updateRole">
    <label :key="role" v-for="role in roles">
      <input name="role" type="radio" :value="role" :checked="userRole == role">
      {{ role }}
    </label>
    <input type="submit" value="Изменить">
  </form>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: max-content;
    padding: 2vw;
    background-color: var(--background-primary);
    backdrop-filter: blur(15px);
    border-radius: 15px;
  }
</style>