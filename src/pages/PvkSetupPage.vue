<script lang="ts">

import {PvkResolver} from "../api/resolvers/pvk/pvk.resolver.ts";
import type {PvkOptionStructureDto} from "../api/resolvers/pvk/dto/PvkOptionStructureDto.ts";
import type {FullPvkStructureDto} from "../api/resolvers/pvk/dto/FullPvkStructure.dto.ts";
import CustomSelect from "../components/UI/inputs/CustomSelect.vue";
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";
import {ProfessionStatisticResolver} from "../api/resolvers/professionStatistic/professionStatistic.resolver.ts";
import type {CreateProfessionStatsDto} from "../api/resolvers/professionStatistic/dto/CreateProfessionStats.dto.ts";
import {jwtDecode} from "jwt-decode";

export default {
  name: 'PvkSetupPage',
  components: {CommonButton, CustomInput, CustomSelect},
  props: {
    professionId: {
      type: Number,
      default: 5
    },
  },
  data() {
    return {
      pvkResolver: new PvkResolver(),
      profScoresResolver: new ProfessionStatisticResolver(),

      selectable: true,
      personalPvk: [] as PvkOptionStructureDto[],
      intellectualPvk: [] as PvkOptionStructureDto[],
      physicalPvk: [] as PvkOptionStructureDto[],
      physiologicalPvk: [] as PvkOptionStructureDto[],
      psychoPhysiologicalPvk: [] as PvkOptionStructureDto[],
      operationalPvk: [] as PvkOptionStructureDto[],
      pvkSelect: ['', '', '', '', '', ''],
      pvkScore: [0, 0, 0, 0, 0, 0],
      oldPvk: [],
      userId: 1,
    }
  },
  methods: {
    async submit() {
      const statsData = [] as CreateProfessionStatsDto[];

      for (let i = 0; i < this.pvkSelect.length; i++) {
        statsData.push({
          professionId: this.professionId,
          pcId: await this.pvkResolver.getByName(this.pvkSelect[i]).then((res) => {
            return res.data.id
          }),
          userId: this.userId,
          score: this.pvkScore[i],
        })
      }

      if (this.selectable) {
        await this.profScoresResolver.createStats(statsData);

        this.oldPvk = await this.profScoresResolver.getOldStats(this.userId, this.professionId).then((res) => {
          return res.data
        })

        if (this.oldPvk.length > 0) {
          this.selectable = false;
          for (let i = 0; i < this.pvkSelect.length; i++) {
            this.pvkSelect[i] = await this.pvkResolver.getProfCharById(this.oldPvk[i].profCharId).then((res) => {
              return res.data.description;
            })
            this.pvkScore[i] = this.oldPvk[i].score;
          }
        }

        this.selectable = false;
      } else {
        await this.profScoresResolver.updateStats(statsData);
      }
    }
  },
  async created() {
    const userId = jwtDecode(localStorage.getItem("token")).id

    if (userId != null) {
      this.userId = Number(userId as string);
    }

    this.oldPvk = await this.profScoresResolver.getOldStats(this.userId, this.professionId).then((res) => {
      return res.data
    })

    if (this.oldPvk.length > 0) {
      this.selectable = false;
      for (let i = 0; i < this.pvkSelect.length; i++) {
        this.pvkSelect[i] = await this.pvkResolver.getProfCharById(this.oldPvk[i].profCharId).then((res) => {
          return res.data.description;
        })
        this.pvkScore[i] = this.oldPvk[i].score;
      }
    }

    const _pvk = await this.pvkResolver.getAll();
    const allPvk = _pvk.data as FullPvkStructureDto[];

    for (let i = 0; i < allPvk.length; i++) {
      const pvk = allPvk[i];

      switch (pvk.PCType) {
        case "PERSONAL":
          this.personalPvk.push({
            value: pvk.name,
            text: pvk.description
          });
          break;

        case "INTELLECTUAL":
          this.intellectualPvk.push({
            value: pvk.name,
            text: pvk.description
          });
          break;

        case "PHYSICAL":
          this.physicalPvk.push({
            value: pvk.name,
            text: pvk.description
          });
          break;

        case "PHYSIOLOGICAL":
          this.physiologicalPvk.push({
            value: pvk.name,
            text: pvk.description
          });
          break;

        case "PSYCHO_PHYSIOLOGICAL":
          this.psychoPhysiologicalPvk.push({
            value: pvk.name,
            text: pvk.description
          });
          break;

        case "OPERATIONAL":
          this.operationalPvk.push({
            value: pvk.name,
            text: pvk.description
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
      <CustomSelect :options="personalPvk" v-model.trim="pvkSelect[0]" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ pvkSelect[0] }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[0]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="intellectualPvk" v-model.trim="pvkSelect[1]" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ pvkSelect[1] }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[1]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physicalPvk" v-model.trim="pvkSelect[2]" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ pvkSelect[2] }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[2]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physiologicalPvk" v-model.trim="pvkSelect[3]" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ pvkSelect[3] }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[3]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="psychoPhysiologicalPvk" v-model.trim="pvkSelect[4]" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ pvkSelect[4] }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[4]"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="operationalPvk" v-model.trim="pvkSelect[5]" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ pvkSelect[5] }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model="pvkScore[5]"/>
    </div>
    <CommonButton @click="submit" class="button">
      <template v-slot:placeholder>
        <p v-if="selectable">Установить оценку</p>
        <p v-if="!selectable">Обновить оценку</p>
      </template>
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

.data-field {
  display: flex;
  align-items: center;
  height: 6vh;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  padding: 0.5rem;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: scroll;
}
</style>