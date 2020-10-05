<template>
  <div class="font-sans leading-loose overflow-hidden">
    <!-- Candidate -->
    <section class="mt-4 px-4 max-w-4xl mx-auto">
      <div
          class="card rounded-lg px-4 py-2 flex flex-col space-y-4 border-t-4 bg-white"
          :class="{
            'border-red': candidate.transparency < 50,
            'border-yellow-50': candidate.transparency >= 50 && candidate.transparency < 90,
            'border-green-100': candidate.transparency >= 90
          }"
      >
        <p class="text-secondary-button text-xxs flex align-middle items-center space-x-1">
          <span
              class="rounded-full h-5 w-5 flex items-center justify-center"
              :class="{
              'bg-red': candidate.transparency < 50,
              'bg-yellow-50': candidate.transparency >= 50 && candidate.transparency < 90,
              'bg-green-100': candidate.transparency >= 90
            }"
          >
            <app-diamond-icon class="w-4 h-4"/>
          </span>
          <span>
            {{
              candidate.transparency >= 50 ? `Perfil ${candidate.transparency}% transparente` : 'Perfil pouco transparente'
            }}
          </span>
        </p>
        <div class="flex items-center">
          <div class="w-1/2 pr-4">
            <img
                class="mx-auto w-32 h-32 rounded-full shadow object-cover"
                src="/img/candidata.png"
                alt="Imagem de perfil"
            />
          </div>

          <div class="w-1/2 pl-4">
            <p class="text-sm text-text">Maria da Silva</p>
            <p class="text-xs sm:text-xs text-text">
              Maceió - AL
            </p>
            <div class="text-disabled-button">
              <p>Vereadora - PX</p>
              <p>12345</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center text-sm text-text">
          <div class="w-1/2 flex items-center space-x-1">
            <span><app-social-icon class="w-4 h-4" provider="twitter" /></span>
            <span>@PedroSilva</span>
          </div>
          <div class="w-1/2 flex items-center space-x-1">
            <span><app-social-icon class="w-4 h-4" provider="twitter" /></span>
            <span>@PedroSilva</span>
          </div>
          <div class="w-1/2 flex items-center space-x-1">
            <span><app-social-icon class="w-4 h-4" provider="twitter" /></span>
            <span>@PedroSilva</span>
          </div>
        </div>
      </div>
    </section>
    <!-- End of Candidate -->

    <!-- Pautas -->
    <section class="mt-4 px-4 max-w-4xl mx-auto">
      <div class="px-4 py-2 flex flex-col space-y-4 bg-white rounded text-text">
        <h3>Pautas</h3>
        <div class="flex flex-wrap text-sm -m-1">
          <div
              v-for="ruling in candidate.ruling"
              :key="ruling"
              class="w-2/5 rounded-full bg-border-button text-white text-center mx-1 my-1"
          >
            {{ ruling }}
          </div>
        </div>
      </div>
    </section>
    <!-- End of Pautas -->

    <!-- Quem Sou -->
    <section class="mt-4 px-4 max-w-4xl mx-auto">
      <div class="px-4 py-2 flex flex-col space-y-4 bg-white rounded text-text">
        <h3 class="font-semibold">Quem sou eu?</h3>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta id molestiae nemo, neque nostrum officiis omnis quas quod, recusandae, reprehenderit sit. A aperiam dolore officia porro rem tenetur, vitae?
        </p>
      </div>
    </section>
    <!-- End of Quem Sou -->

    <!-- Minhas Propostas -->
    <section class="mt-4 px-4 max-w-4xl mx-auto">
      <div class="px-4 py-2 flex flex-col space-y-4 bg-white rounded text-text">
        <h3 class="font-semibold">Minhas propostas</h3>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta id molestiae nemo, neque nostrum officiis omnis quas quod, recusandae, reprehenderit sit. A aperiam dolore officia porro rem tenetur, vitae?
        </p>
      </div>
    </section>
    <!-- End of Minhas Propostas -->

    <!-- Candidaturas Relacionadas -->
    <section class="mt-4 px-4 max-w-4xl mx-auto">
      <h3 class="font-semibold text-center text-text">Candidaturas relacionadas</h3>
      <div class="overflow-x-scroll py-2 space-x-2" style="display: flex; flex-wrap: nowrap; overflow-x: auto;">
        <div
            v-for="candidate in candidates"
            :key="candidate.id"
            class="w-1/2 max-w-xs"
            style="flex: 0 0 auto;"
        >
          <app-candidate-card
              :candidate="candidate"
          />
        </div>
      </div>
    </section>
    <!-- End of Candidaturas Relacionadas -->
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

import AppDiamondIcon from '@/components/DiamondIcon.vue';
import AppSocialIcon from '@/components/SocialIcon.vue';
import AppCandidateCard from '@/components/CandidateCard.vue';
import {ACTIONS} from '@/store/types';

export default {
  name: 'Candidato',
  components: {
    AppDiamondIcon,
    AppSocialIcon,
    AppCandidateCard,
  },
  computed: {
    ...mapState({
      candidates: (state) => state.candidates.data,
      candidate: (state) => state.candidates.data[0] || null,
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
  },
}
</script>
