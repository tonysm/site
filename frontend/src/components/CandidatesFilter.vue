<template>
  <div>
    <div class="border-b mb-4 pb-4">
      <div class="p-4 pb-0 flex flex-wrap">
        <div class="w-2/3 md:mb-0">
          <app-select-field
            :value="value.state"
            :options="states"
            placeholder="Estado"
            @change="(state) => $emit('input', {...value, state })"
          />
        </div>
        <div class="w-1/3 pl-3">
          <app-text-field
            :value="value.year"
            type="year"
            @input="year => $emit('input', {...value, year })"
          />
        </div>
      </div>
    </div>
    
    <div class="px-4 mb-4 flex flex-wrap" v-if="value.state">
      <div class="w-2/3 md:mb-0">
        <app-select-field
          :value="value.city"
          :options="cities"
          placeholder="Cidade"
          @change="(city) => $emit('input', { ...value, city })"
        />
      </div>
      <div class="w-1/3 pl-3">
        <app-select-field
          :value="value.position"
          :options="positions"
          placeholder="Cargo"
          @change="(position) => $emit('input', { ...value, position })"
        >
        </app-select-field>
      </div>
    </div>

    <div class="px-4 pb-2 pb-2">
      <app-tags-field
        :value="value.tags"
        :options="tags"
        @input="(selectedTags) => $emit('input', { ...value, tags: selectedTags })"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppSelectField from '@/components/SelectField.vue';
import AppTextField from '@/components/TextField.vue';
import AppTagsField from '@/components/TagsField.vue';
import { ACTIONS } from '@/store/types';

export default {
  name: "CandidatesFilter",
  components: {
    AppSelectField,
    AppTextField,
    AppTagsField,
  },
  props: {
    value: Object,
  },
  computed: {
    ...mapState({
      states: (state) => state.states.data,
      cities: (state) => state.cities.data,
      positions: (state) => state.positions,
      tags: (state) => state.tags,
    }),
  },
  watch: {
    'value.state'(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.loadCities();
      }
    },
  },
  methods: {
    ...mapActions({
      loadCities: ACTIONS.LOAD_CITIES,
    }),
  },
}
</script>
