<script lang="ts">

import {PvkResolver} from "../api/resolvers/pvk/pvk.resolver.ts";
import type {PvkOptionStructureDto} from "../api/resolvers/pvk/dto/PvkOptionStructureDto.ts";
import type {FullPvkStructureDto} from "../api/resolvers/pvk/dto/FullPvkStructure.dto.ts";
import CustomSelect from "../components/UI/inputs/CustomSelect.vue";
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";

export default {
  name: 'PvkSetupPage',
  components: {CommonButton, CustomInput, CustomSelect},
  props: {
    professionId: Number
  },
  data() {
    return {
      personalPvk: [] as PvkOptionStructureDto[],
      intellectualPvk: [] as PvkOptionStructureDto[],
      physicalPvk: [] as PvkOptionStructureDto[],
      physiologicalPvk: [] as PvkOptionStructureDto[],
      psychoPhysiologicalPvk: [] as PvkOptionStructureDto[],
      operationalPvk: [] as PvkOptionStructureDto[],

      personalPvkScore: 0,
      intellectualPvkScore: 0,
      physicalPvkScore: 0,
      physiologicalPvkScore: 0,
      psychoPhysiologicalPvkScore: 0,
      operationalPvkScore: 0,

      personalPvkSelect: '',
      intellectualPvkSelect: '',
      physicalPvkSelect: '',
      physiologicalPvkSelect: '',
      psychoPhysiologicalPvkSelect: '',
      operationalPvkSelect: '',
    }
  },
  methods: {
    submit() {

    }
  },
  async created() {
    const pvkResolver = new PvkResolver();
    const _pvk = await pvkResolver.getAll();
    const allPvk = _pvk.data as FullPvkStructureDto[];

    for (let i = 0; i < allPvk.length; i++) {
      const pvk = allPvk[i];

      switch (pvk.PCType) {
        case "PERSONAL":
          this.personalPvk.push({
            value: pvk.name,
            text: pvk.name
          });
          break;

        case "INTELLECTUAL":
          this.intellectualPvk.push({
            value: pvk.name,
            text: pvk.name
          });
          break;

        case "PHYSICAL":
          this.physicalPvk.push({
            value: pvk.name,
            text: pvk.name
          });
          break;

        case "PHYSIOLOGICAL":
          this.physiologicalPvk.push({
            value: pvk.name,
            text: pvk.name
          });
          break;

        case "PSYCHO_PHYSIOLOGICAL":
          this.psychoPhysiologicalPvk.push({
            value: pvk.name,
            text: pvk.name
          });
          break;

        case "OPERATIONAL":
          this.operationalPvk.push({
            value: pvk.name,
            text: pvk.name
          });
          break;
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <h2 class="container-header">Добавить / Изменить профессионально важные качества</h2>
    <div class="pvk-block">
      <CustomSelect :options="personalPvk" v-model.trim="personalPvkSelect" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="personalPvkScore"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="intellectualPvk" v-model.trim="intellectualPvkSelect" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="intellectualPvkScore"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physicalPvk" v-model.trim="physicalPvkSelect" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="physicalPvkScore"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physiologicalPvk" v-model.trim="physiologicalPvkSelect" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="physiologicalPvkScore"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="psychoPhysiologicalPvk" v-model.trim="psychoPhysiologicalPvkSelect" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="psychoPhysiologicalPvkScore"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="operationalPvk" v-model.trim="operationalPvkSelect" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="operationalPvkScore"/>
    </div>
    <CommonButton @click="submit" class="button">
      <template v-slot:placeholder>Установить оценку</template>
    </CommonButton>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 35vw;
}

.pvk-block {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 1rem;
}

.button, .button:hover {
  background-color: #4127e4;
  color: white;
}
</style>