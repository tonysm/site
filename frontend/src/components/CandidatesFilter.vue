<template>
  <div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-2/3 px-3 mb-6 md:mb-0">
        <app-select-field
            :value="value.state"
            :options="states"
            placeholder="Estado"
            @change="(state) => $emit('input', {...value, state })"
        />
      </div>
      <div class="w-1/3 px-3">
        <app-text-field
            :value="value.year"
            type="year"
            @input="year => $emit('input', {...value, year })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import AppSelectField from '@/components/SelectField.vue';
import AppTextField from '@/components/TextField.vue';

export default {
  name: "CandidatesFilter",
  components: {
    AppSelectField,
    AppTextField,
  },
  props: {
    value: Object,
  },
  computed: {
    ...mapState({
      states: (state) => state.states.data,
    })
  }
}
</script>
