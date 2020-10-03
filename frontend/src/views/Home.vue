<template>
  <div class="font-sans leading-loose overflow-hidden">
    <!-- Filters -->
    <section class="w-full sm:max-w-4xl mx-auto border-b text-sm sm:text-lg text-text">
      <app-candidates-filter v-model="filters"/>
    </section>
    <!-- End of Filters -->

    <section class="mt-4 px-4 max-w-4xl mx-auto grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      <app-candidate-card
          v-for="candidate in candidates"
          :key="candidate.id"
          :candidate="candidate"
      />
    </section>
    <div class="text-center text-sm text-text">
      <button @click.prevent="loadMore" class="inline-flex items-center space-x-2 p-2">
        <svg v-if="loadingMore" class="animate-spin mr-2 -ml-1 h-5 w-5 text-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        ver mais
      </button>
    </div>
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
        tags: [],
      },
      loadingMore: false,
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
    async loadMore() {
      this.loadingMore = true;

      await new Promise((resolve) => {
        setTimeout(resolve, 600);
      })

      this.loadingMore = false;
    }
  },
  mounted() {
    this.loadStates();
    this.loadCandidates();
  }
}
</script>
