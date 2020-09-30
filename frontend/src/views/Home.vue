<template>
  <div class="font-sans leading-loose">
    <!-- Filters -->
    <section class="max-w-4xl mx-auto p-8 pb-0 text-sm sm:text-lg text-text">
      <app-candidates-filter v-model="filters"/>
    </section>
    <!-- End of Filters -->

    <section class="max-w-4xl mx-auto p-8 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      <app-candidate-card
          v-for="candidate in candidates"
          :key="candidate.id"
          :candidate="candidate"
      />
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppCandidatesFilter from '@/components/CandidatesFilter.vue';
import AppCandidateCard from '@/components/CandidateCard.vue';
import { ACTIONS } from '@/store/types';

export default {
  name: 'Home',
  components: {
    AppCandidatesFilter,
    AppCandidateCard,
  },
  data() {
    return {
      filters: {
        state: '',
        year: new Date().getFullYear().toString(),
        city: '',
        position: '',
        subjects: [],
      },
    };
  },
  computed: {
    ...mapState({
      candidates: (state) => state.candidates.data,
    }),
  },
  methods: {
    ...mapActions({
      loadStates: ACTIONS.LOAD_STATES,
      loadCandidates: ACTIONS.LOAD_CANDIDATES,
    }),
  },
  mounted() {
    this.loadStates();
    this.loadCandidates();
  }
}
</script>
