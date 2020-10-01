<template>
    <div>
    <div class="-mx-3 mb-2">
        <div class="w-full px-3 md:mb-0 relative">
          <div class="w-full relative">
            <button @click.prevent="isOpen = !isOpen" class="w-full p-2 pl-4 leading-6 rounded bg-white text-disabled-button border border-border-button hover:border-gray-500">
                Pautas
            </button>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
          </div>

          <div v-if="isOpen" class="absolute px-3 left-0 w-full flex flex-col divide-y-2 divide-gray-100">
              <div class="shadow divide-y-2">
                <button
                  v-for="option in remainingOptions"
                  :key="option"
                  class="w-full px-2 py-4 bg-white"
                  @click.prevent="$emit('input', [...value, option])"
                >{{ option }}</button>
                <div class="w-full text-center text-xs px-2 py-4 bg-white" v-if="remainingOptions.length === 0">
                  Todos as pautas foram selecionadas.
                </div>
              </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap -mx-1">
        <div class="w-2/5 p-1" v-for="selected in value" :key="selected">
          <div class="text-center bg-border-button text-white px-2 py-0 rounded-full flex items-center justify-between">
            <span class="truncate flex-1 text-center">{{ selected }}</span>
            <button @click.prevent="remove(selected)"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "TagsField",
    props: {
        value: Array,
        options: Array,
    },
    data() {
      return {
        isOpen: false,
      }
    },
    computed: {
        remainingOptions() {
            return this.options.filter(opt => !this.value.includes(opt))
        }
    },
    methods: {
      remove(item) {
        this.$emit('input', this.value.filter(opt => opt !== item));
      }
    }
}
</script>