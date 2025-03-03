<script setup lang="ts">
import type {UserRole} from "../utils/userState/UserState.types.ts";
import {setRole} from "../services/user.ts";
import {popUpState} from "../utils/popUpState.ts";
import {ref} from "vue";

const emit = defineEmits(['role-update'])
const props = defineProps<{
  userId: number;
  userRole: UserRole;
}>()
const roles: UserRole[] = [
    "ADMIN", "EXPERT", "CONSULTANT", "USER", "MODERATOR"
]
const selectedRole = ref()

const updateRole = async () => {
  const result = await setRole(props.userId, selectedRole.value);
  popUpState.value = result.body;
  if (result.status === 200) {
    emit("role-update");
  }
}
</script>

<template>
  <form @submit.prevent="updateRole()">
    <label :key="role" v-for="role in roles">
      <input
          name="role"
          type="radio"
          :value="role"
          :checked="userRole == role"
          v-model="selectedRole"
      >
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