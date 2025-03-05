<script setup lang="ts">
import {hide} from "@floating-ui/vue";
import {ProfessionResolver} from "../api/resolvers/profession/profession.resolver.ts";

const emit = defineEmits(['profession-update'])
  const props = defineProps<{
    profession: {
      id: number;
      name: string;
      description: string;
      requirements: string;
      sphere: string;
    }
  }>()

const updateProfession = async () => {
  const professionResolver = new ProfessionResolver()
  const result = await professionResolver.updateProfession(props.profession);
  emit("profession-update")
}
</script>

<template>
  <div class="profession-edit">
    <h4>Изменить профессию</h4>
    <form @submit.prevent="updateProfession" id="profession-change-form">
      <label><input
          required
          type="text"
          id="profName"
          v-model="profession.name"
      ></label>
      <label><textarea
          required
          id="profDesc"
          v-model="profession.description"
        ></textarea></label>
      <label><textarea
          required
          id="profRequ"
          v-model="profession.requirements"
      ></textarea></label>
      <label><input
          required
          type="text"
          id="profSphere"
          v-model="profession.sphere"
      ></label>
      <label><input
          required
          type="number"
          id="profId"
          hidden="hidden"
          disabled
          v-model="profession.id"
      ></label>
      <input type="submit" value="Изменить">
    </form>
  </div>
</template>

<style scoped>
.profession-edit{
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--background-primary);
  padding: 2vw;
  width: 20vw;
  box-sizing: border-box;
}

.profession-edit form {
  display: flex;
  flex-direction: column;
  z-index: 10;
  gap: 1vh;
}

.profession-edit label {
  display: flex;
  gap: 0.5rem;
}

.profession-edit input,
.profession-edit textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
}

.profession-edit textarea {
  min-height: 10vh;
}
</style>