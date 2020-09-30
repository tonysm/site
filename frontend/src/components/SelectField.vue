<template>
  <div class="inline-block w-full relative">
    <select
        class="block appearance-none w-full bg-white text-disabled-button border border-border-button hover:border-gray-500 p-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        v-bind="$attrs"
        v-model="selected"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectField",
  inheritAttrs: false,
  props: {
    value: String,
    placeholder: String,
    options: Array,
  },
  data() {
    return {
      selected: this.value,
    };
  }
}
</script>