<script lang="ts">

import {PvkResolver} from "../api/resolvers/pvk/pvk.resolver.ts";
import type {PvkOptionStructureDto} from "../api/resolvers/pvk/dto/PvkOptionStructureDto.ts";
import type {FullPvkStructureDto} from "../api/resolvers/pvk/dto/FullPvkStructure.dto.ts";
import CustomSelect from "../components/UI/inputs/CustomSelect.vue";
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";
import {ProfessionStatisticResolver} from "../api/resolvers/professionStatistic/professionStatistic.resolver.ts";
import type {CreateProfessionStatsDto} from "../api/resolvers/professionStatistic/dto/CreateProfessionStats.dto.ts";

export default {
  name: 'PvkSetupPage',
  components: {CommonButton, CustomInput, CustomSelect},
  props: {
    professionId: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      personalPvk: [] as PvkOptionStructureDto[],
      intellectualPvk: [] as PvkOptionStructureDto[],
      physicalPvk: [] as PvkOptionStructureDto[],
      physiologicalPvk: [] as PvkOptionStructureDto[],
      psychoPhysiologicalPvk: [] as PvkOptionStructureDto[],
      operationalPvk: [] as PvkOptionStructureDto[],

      pvkSelect: ['', '', '', '', '', ''],
      pvkScore: [0, 0, 0, 0, 0, 0],
    }
  },
  methods: {
    async submit() {
      const resolver = new ProfessionStatisticResolver();
      const pvkResolver = new PvkResolver();
      const statsData = [] as CreateProfessionStatsDto[];
      const userId = 3;

      for (let i = 0; i < this.pvkSelect.length; i++) {
        statsData.push({
          professionId: this.professionId,
          pcId: await pvkResolver.getByName(this.pvkSelect[i]).then((res) => {return res.data.id}),
          userId: userId,
          score: this.pvkScore[i],
        })
      }

      await resolver.createStats(statsData);
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
      <CustomSelect :options="personalPvk" v-model.trim="pvkSelect[0]" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[0]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="intellectualPvk" v-model.trim="pvkSelect[1]" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[1]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physicalPvk" v-model.trim="pvkSelect[2]" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[2]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physiologicalPvk" v-model.trim="pvkSelect[3]" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[3]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="psychoPhysiologicalPvk" v-model.trim="pvkSelect[4]" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[4]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="operationalPvk" v-model.trim="pvkSelect[5]" class="selector"/>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[5]"/>
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