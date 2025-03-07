<script lang="ts">

import {PvkResolver} from "../api/resolvers/pvk/pvk.resolver.ts";
import type {PvkOptionStructureDto} from "../api/dto/pvk-option-structure.dto.ts";
import type {FullPvkStructureInputDto} from "../api/resolvers/pvk/dto/input/full-pvk-structure-input.dto.ts";
import CustomSelect from "../components/UI/inputs/CustomSelect.vue";
import CustomInput from "../components/UI/inputs/CustomInput.vue";
import CommonButton from "../components/UI/CommonButton.vue";
import {ProfessionStatisticResolver} from "../api/resolvers/professionStatistic/professionStatistic.resolver.ts";
import type {
  CreateProfessionStatsOutputDto
} from "../api/resolvers/professionStatistic/dto/output/create-profession-stats-output.dto.ts";
import {jwtDecode} from "jwt-decode";
import type {GetOldStatsInputDto} from "../api/resolvers/professionStatistic/dto/input/get-old-stats-input.dto.ts";
import type {UniversalStatisticCollectionDto} from "../api/dto/universal-statistic-collection.dto.ts";

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
      selector: Array.from({ length: 6 }, () => ({ name: "", score: 0 })) as UniversalStatisticCollectionDto[],
      oldPvk: [] as GetOldStatsInputDto[],
      userId: 1,
    }
  },
  methods: {
    async submit() {
      const statsData = [] as CreateProfessionStatsOutputDto[];

      for (let i = 0; i < this.pvkSelect.length; i++) {
        statsData.push({
          professionId: this.professionId,
          pcId: await this.pvkResolver.getByName(this.pvkSelect[i]).then((res) => {
            return res.id
          }),
          userId: this.userId,
          score: this.pvkScore[i],
        })
      }

      if (this.selectable) {
        await this.profScoresResolver.createStats(statsData);

        this.oldPvk = await this.profScoresResolver.getOldStats({
          userId: this.userId,
          professionId: this.professionId
        }).then((res) => {
          return res
        });

        if (this.oldPvk.length > 0) {
          this.selectable = false;
          for (let i = 0; i < this.pvkSelect.length; i++) {
            this.selector[i].name = await this.pvkResolver.getProfCharById(this.oldPvk[i].profCharId).then((res) => {
              return res.description;
            })
            this.selector[i].score = this.oldPvk[i].score;
          }
          this.selector.sort((a, b) => b.score - a.score);
        }

        this.selectable = false;
      } else {
        await this.profScoresResolver.updateStats(statsData);
      }
    }
  },
  async created() {
    const token = localStorage.getItem("token")
    let userId: string | null = null;
    if (token != null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      userId = jwtDecode(token).id
    }

    if (userId != null) {
      this.userId = Number(userId);
    }

    this.oldPvk = await this.profScoresResolver.getOldStats({
      userId: this.userId,
      professionId: this.professionId
    }).then((res) => {
      return res
    })

    if (this.oldPvk.length > 0) {
      this.selectable = false;
      for (let i = 0; i < this.pvkSelect.length; i++) {
        this.selector[i].name = await this.pvkResolver.getProfCharById(this.oldPvk[i].profCharId).then((res) => {
          return res.description;
        })
        this.selector[i].score = this.oldPvk[i].score;
      }
      this.selector.sort((a, b) => b.score - a.score);
    }

    const _pvk = await this.pvkResolver.getAll();
    const allPvk = _pvk as FullPvkStructureInputDto[];

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
      <CustomSelect :options="personalPvk" v-model.trim="selector[0].name" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ selector[0].name }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model.number="selector[0].score"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="intellectualPvk" v-model.trim="selector[1].name" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ selector[1].name }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model.number="selector[1].score"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physicalPvk" v-model.trim="selector[2].name" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ selector[2].name }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model.number="selector[2].score"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="physiologicalPvk" v-model.trim="selector[3].name" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ selector[3].name }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model.number="selector[3].score"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="psychoPhysiologicalPvk" v-model.trim="selector[4].name" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ selector[4].name }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model.number="selector[4].score"/>
    </div>
    <div class="pvk-block">
      <CustomSelect :options="operationalPvk" v-model.trim="selector[5].name" class="selector" v-if="selectable"/>
      <div class="data-field" v-if="!selectable">{{ selector[5].name }}</div>
      <CustomInput class="input" :type="'number'" :min-number="-10" :max-number="10" v-model.number="selector[5].score"/>
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