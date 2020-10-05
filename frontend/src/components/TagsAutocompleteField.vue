<template>
  <div class="relative" @click.stop>
    <label v-if="label" class="block text-sm font-bold mb-2" :id="$attrs['id']">
      {{ label }}
    </label>
    <input
        class="shadow appearance-none border border-border-button text-center rounded w-full p-3 text-disabled-button leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        autocomplete="off"
        v-bind="$attrs"
        v-model="search"
        @focus="isOpen = true"
        @keypress.esc="isOpen = false"
        @keydown.tab="isOpen = false"
        ref="input"
    />
    <div v-if="isOpen" class="absolute left-0 w-full flex flex-col divide-y-2 divide-gray-100">
      <div class="shadow divide-y-2">
        <button
            v-for="option in limitedFilteredOptions"
            :key="option"
            class="w-full p-2 bg-white"
            @click.prevent="addOption(option)"
        >{{ option }}
        </button>
        <div class="w-full text-center text-xs px-2 py-4 bg-white" v-if="limitedFilteredOptions.length === 0">
          Nenhuma pauta encontrada. Tente outro termo.
        </div>
      </div>
    </div>

    <p class="text-disabled-button text-sm" v-if="tagsLimitReached">
      você atingiu o limite máximo de pautas.
    </p>

    <div class="flex flex-wrap -mx-1">
      <div class="w-2/5 p-1" v-for="selected in value" :key="selected">
        <div class="text-center bg-border-button text-white px-2 py-0 rounded-full flex items-center justify-between">
          <span class="truncate flex-1 text-center">{{ selected }}</span>
          <button @click.prevent="remove(selected)">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsAutocompleteField",
  inheritAttrs: false,
  props: {
    label: String,
    value: Array,
    options: Array,
    max: Number,
  },
  computed: {
    limitedFilteredOptions () {
      return this.filteredOptions.slice(0, 5);
    },
    filteredOptions () {
      const remainingOptions = this.options.filter(opt => ! this.value.includes(opt));

      if (! this.search) {
        return remainingOptions;
      }

      return remainingOptions.filter(opt => opt.toLowerCase().includes(this.search.toLowerCase()));
    },
    tagsLimitReached() {
      return this.max && this.value.length >= this.max;
    },
  },
  data() {
    return {
      search: '',
      isOpen: false,
    }
  },
  methods: {
    addOption(option) {
      // Prevent adding more tags than the limit.
      if (this.tagsLimitReached) {
        return false;
      }

      this.$emit('input', [...this.value, option]);
      this.search = '';
      this.$refs.input.focus();
    },
    remove(option) {
      this.$emit('input', this.value.filter(opt => opt !== option));
    },
    clickOutside() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener('click', this.clickOutside.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener('click', this.clickOutside);
  },
}
</script>
