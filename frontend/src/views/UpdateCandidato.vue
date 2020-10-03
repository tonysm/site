<template>
  <div class="font-sans leading-loose">
    <!-- Termos de Uso -->
    <section class="absolute text-white top-0 bottom-0 left-0 z-40 bg-secondary-button right-0 h-screen overflow-y-scroll mx-auto flex flex-col space-y-6 p-8 text-sm sm:text-lg" v-if="!termosDeUsoAceito">
      <div class="px-2 pb-4">
        <app-logo-light class="block h-10 w-auto mx-auto" />
      </div>

      <h3 class="text-xl text-center font-semibold">Termos de Uso</h3>

      <div class="p-4 text-sm bg-white text-text rounded overflow-hidden overflow-y-scroll" :style="{ 'height': '300px' }">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex, explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex, explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex, explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex, explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex, explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex, explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias assumenda dolor eius et ex, explicabo harum in, ipsa maxime nihil nobis pariatur perferendis quod rerum sapiente ut veritatis!</p>
      </div>
      <div>
        <app-checkbox v-model="termosDeUsoAceito">Li e aceito os termos de uso.</app-checkbox>
      </div>
      <button
          class="p-2 rounded w-full text-white"
          :class="{'bg-disabled-button': !termosDeUsoAceito, 'bg-primary-button': termosDeUsoAceito}"
          type="submit"
      >Concordar</button>
    </section>
    <!-- End of Termos de Uso -->

    <!-- Update Candidato -->
    <section class="text-text max-w-4xl mx-auto flex flex-col space-y-6 p-8 text-sm sm:text-lg">
      <h3 class="text-xl text-center font-semibold">Edit Candidato</h3>

      TODO
    </section>
    <!-- End of Update Candidato -->
  </div>
</template>

<script>
import AppLogoLight from '@/components/LogoLight.vue';
import AppCheckbox from '@/components/Checkbox.vue';

export default {
  name: 'Home',
  components: {
    AppLogoLight,
    AppCheckbox,
  },
  data () {
    return {
      termosDeUsoAceito: false,
    }
  },
}
</script>
