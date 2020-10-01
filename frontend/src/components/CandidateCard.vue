<template>
  <div
      class="card rounded-lg px-4 py-6 flex flex-col space-y-4 border-t-4"
      :class="{
        'border-red': candidate.transparency < 50,
        'border-yellow-50': candidate.transparency >= 50 && candidate.transparency < 90,
        'border-green-100': candidate.transparency >= 90
      }"
  >
    <p class="text-secondary-button text-xxs sm:text-xs text-center flex align-middle items-center justify-center space-x-1">
      <span
          class="rounded-full h-5 w-5 flex items-center justify-center"
          :class="{
          'bg-red': candidate.transparency < 50,
          'bg-yellow-50': candidate.transparency >= 50 && candidate.transparency < 90,
          'bg-green-100': candidate.transparency >= 90
        }"
      >
        <app-diamond-icon class="w-4 h-4" />
      </span>
      <span>
        {{ candidate.transparency >= 50 ? `Perfil ${candidate.transparency}% transparente` : 'Perfil pouco transparente' }}
      </span>
    </p>
    <img class="mx-auto w-32 h-32 rounded-full shadow object-cover" src="/img/candidata.png" alt="Imagem de perfil"/>
    <div>
      <p class="text-sm text-text">Maria da Silva</p>
      <p class="text-xxs sm:text-xs text-text">
        Maceió - AL
      </p>
      <div class="text-disabled-button">
        <p>Vereadora - PX</p>
        <p>12345</p>
      </div>
    </div>
    <div class="flex flex-wrap text-xxs -m-1">
      <div
          v-for="ruling in candidate.ruling"
          :key="ruling"
          class="w-2/5 rounded-full bg-border-button text-white text-center mx-1 my-1"
      >
        {{ ruling }}
      </div>
    </div>
  </div>
</template>

<script>
import AppDiamondIcon from '@/components/DiamondIcon.vue';

export default {
  name: "CandidateCard",
  components: {
    AppDiamondIcon,
  },
  props: {
    candidate: Object,
  },
}
</script>

<style scoped>
.card {
  background: #FFFFFF;
  box-shadow: 0 2px 20px rgba(7, 149, 251, 0.1);
  border-radius: 5px;
}
</style>