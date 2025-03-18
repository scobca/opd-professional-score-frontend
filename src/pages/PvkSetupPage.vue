<script setup lang="ts">

import CustomInput from '../components/UI/inputs/CustomInput.vue';
import { inject, onMounted, onUnmounted, ref } from 'vue';
import { io } from 'socket.io-client';
import type { PvkOptionStructureDto } from '../api/dto/pvk-option-structure.dto.ts';
import type { PvkOptionSelectedStructureDto} from '../api/dto/pvk-option-selected-structure.dto.ts';

type Socket = ReturnType<typeof io>;

defineEmits(['search'])
const searchQuery = ref("")
const socket = inject<Socket>('socket');
const isOpened = ref(false)
let pvks: PvkOptionStructureDto[]
socket.on('searchResults', (data) => {
  pvks = data
})
let selectedPvks: PvkOptionSelectedStructureDto[];

const showOptions = () => {
  isOpened.value = !isOpened.value
}

const search = async (query) => {
  socket.emit('search', query);
  isOpened.value = query.length > 0;
}

onMounted(() => {
  socket.connect()
})


onUnmounted(() => {
  socket.disconnect()
})


</script>

<template>
  <form action="#" method="post" id="pvk-form" class="profession-form">
    <h1>Добавить / Изменить профессионально-важные качества</h1>
    <div class="pvk-rate">
      <div class="multiselect">
        <div class="search-field">
          <label>
            <CustomInput class="search-input" @input="search(searchQuery)" v-model="searchQuery" :placeholder="'Введите сюда название ПВК'"/>
          </label>
          <button type="button" :class="isOpened ? 'show-options clicked' : 'show-options'" @click="showOptions">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
          </button>
        </div>
        <div :class="isOpened ? 'options show' : 'options'" v-if="pvks">
          <div
            :key="index"
            class="option"
            v-for="(pvk, index) in pvks"
          >
            <p>{{ pvk.text }}</p>
          </div>
        </div>
        <div :class="isOpened ? 'options show' : 'options'" v-else>
          <div class="option default">
            <p>Ничего не найдено</p>
          </div>
        </div>
      </div>
      <div class="ratings disabled">
        <div
          class="rating"
          v-for="(pvk, index) in selectedPvks"
          :key="index"
        >
          <p>{{ pvk.text }}</p>
          <label>
            <input type="checkbox" :value="pvk.rating">
          </label>
        </div>
      </div>
    </div>
    <button type="submit">Применить</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px #4127e4;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  width: 60vw;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4127e4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #9a8bf8;
}

.pvk-rate {
  display: flex;
  gap: 2vw;
  margin: 2vh 0;
}

.multiselect {
  width: 24vw;
  position: relative;
  margin-bottom: 2vh;
  height: 5vh;

  .search-field {
    display: flex;
    border: solid 2px #4127e4;;
    max-height: 100%;
    border-radius: 5px;

    label {
      flex: 15;
      margin: 0;

      input {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        margin: 0;
        border: none;
      }
      input:hover {
        transform: none;
      }
      input:focus {
        outline: none;
      }
    }
    button {
      flex: 1;
      background-color: transparent;

      svg {
        width: 75%;
        fill: #4127e4;;
        transition: transform 0.5s;
      }
    }

    .clicked svg {
      transform: rotate(180deg);
    }
  }

  .options {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    opacity: 0;
    top: 110%;
    border-radius: 5px;
    transition: all 0.4s;
    background-color: white;
    max-height: 40vh;
    overflow-y: scroll;
    visibility: hidden;

    .option {
      background-color: rgba(65, 39, 228, 0.2);
      border-bottom: solid 1px rgba(65, 39, 228, 0.5);
      min-height: calc((40vh - 7px) / 7);
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        padding: 14px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 0;
        flex: 1;
      }

      input {
        width: 70%;
        aspect-ratio: 1 / 1;
      }

      p {
        padding: 14px;
        white-space: nowrap;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow-x: hidden;
        flex: 15;
        user-select: none;
      }
    }

    .option:hover,
    .option.selected:hover {
      cursor: pointer;
      background-color: #9a8bf8;
      color: white;
    }

    .option.default:hover {
      cursor: not-allowed;
      background-color: rgba(65, 39, 228, 0.2);
      color: black;
    }

    .option.selected {
      background-color: rgb(93, 78, 255);;
      color: white;
    }
  }

  .options.show {
    visibility: visible;
    opacity: 1;
    top: 100%;
  }
}

.ratings {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 34vw;
  height: 45vh;
  gap: 1vh;
  padding: 2vh 1vw;
  border: solid 2px #4127e4;

  .rating {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 1vh;
    gap: 2vw;

    p {
      overflow-x: hidden;
      -ms-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    label {
      margin: 0 0 0 auto;
      display: flex;
      height: 3vh;
      aspect-ratio: 1 / 1;

      input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        text-align: center;
      }
    }
  }
}

.ratings.disabled::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(103,90,152,0.6);
}

.ratings.disabled:hover {
  cursor: not-allowed;
}
</style>