<script setup lang="ts">
import type {UpdateProfessionDto} from "../api/resolvers/profession/dto/input/update-profession.dto.ts";
import { computed } from 'vue';
import { ProfessionResolver } from '../api/resolvers/profession/profession.resolver.ts';
import { UserState } from '../utils/userState/UserState.ts';

const emit = defineEmits(['profession-update'])
const props = defineProps<{
  profession: UpdateProfessionDto | null,
}>()

const localProfession = computed(() => props.profession)
const updateProfession = async () => {
  if (localProfession.value != null) {
    const professionResolver = new ProfessionResolver()
    await professionResolver.updateProfession(localProfession.value)
    emit("profession-update")
  }
}

</script>

<template>
  <div class="profession-edit" v-if="localProfession != null">
    <h4>Изменить профессию</h4>
    <form @submit.prevent="updateProfession" id="profession-change-form">
      <label><input
          required
          type="text"
          id="profName"
          v-model="localProfession.updatedData.name"
      ></label>
      <label><textarea
          required
          id="profDesc"
          v-model="localProfession.updatedData.description"
      ></textarea></label>
      <label><textarea
          required
          id="profRequ"
          v-model="localProfession.updatedData.requirements"
      ></textarea></label>
      <label><input
          required
          type="text"
          id="profSphere"
          v-model="localProfession.updatedData.sphere"
      ></label>
      <label><input
          required
          type="number"
          id="profId"
          hidden="hidden"
          disabled
          v-model="localProfession.id"
      ></label>
      <label>
        Архивировать
        <input
        type="checkbox"
        id="profArchive"
        :disabled="UserState.role != 'ADMIN'"
        v-model="localProfession.updatedData.archive"
      ></label>
      <input type="submit" value="Изменить">
    </form>
  </div>
</template>

<style scoped>
.profession-edit {
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