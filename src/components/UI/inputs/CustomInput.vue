<script lang="ts">
export default {
  name: 'CustomInput',
  emits: ['search'],
  props: {
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: [String, Number],
    },
    minNumber: {
      type: Number,
      default: 0,
    },
    maxNumber: {
      type: Number,
      default: 100,
    },
    maxLength: {
      type: Number,
      default: 1000,
    }
  },
  methods: {
    validate(event: any) {
      const inputValue = event.target.value;

      if (isNaN(inputValue)) {
        return;
      }

      if (inputValue.length > this.maxLength) {
        event.target.value = inputValue.slice(0, this.maxLength);
        this.$emit('update:modelValue', parseFloat(event.target.value));
        return;
      }

      if (inputValue < this.minNumber) {
        this.$emit('update:modelValue', this.minNumber);
      } else if (inputValue > this.maxNumber) {
        this.$emit('update:modelValue', this.maxNumber);
      } else {
        this.$emit('update:modelValue', inputValue);
      }
    },
    update(event: any) {
      this.$emit('search');
      this.$emit('update:modelValue', event.target.value)
    }
  },
}
</script>

<template>
  <input class="input"
         v-if="type!='number'"
         :placeholder="placeholder"
         :type="type"
         :value="modelValue"
         :maxlength="maxLength"
         @input="update($event)"
  />
  <input class="input"
         v-if="type=='number'"
         :placeholder="placeholder"
         :type="type"
         :min="minNumber"
         :max="maxNumber"
         :value="modelValue"
         @input="validate($event)"
         required
  />
</template>

<style scoped>
.input {
  width: 100%;
  height: 100%;
  border: 1px solid var(--input-border);
  border-radius: 0.5rem;
  transition-duration: 0.2s;
  background-color: white;
  text-align: left;
  text-indent: 2%;
}

.input::placeholder {
  text-align: left;
  color: rgba(0, 0, 0, 0.7);
  text-indent: 2%;
}

.input:active, .input:focus {
  border: 1px solid var(--input-border);
  outline: none;
  transition-duration: 0.2s;
  text-indent: 2%;
}

.input:hover {
  border: 1px solid var(--input-border);
  transition-duration: 0.2s;
  text-indent: 2%;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>