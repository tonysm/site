<template>
  <nav class="bg-flux-candidate z-20">
    <!-- Primary Navigation Menu -->
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto w-full flex justify-center items-center py-3 relative">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/">
            <app-logo class="block h-10 w-auto"/>
          </router-link>
        </div>

        <!-- hamburger menu -->
        <button class="absolute right-0 z-20" :class="{'text-primary-button': !isMenuOpen, 'text-flux-candidate': isMenuOpen}" @click.prevent="isMenuOpen = !isMenuOpen">
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
    <div class="bg-primary-button absolute top-0 bottom-0 right-0 left-0 h-screen" v-if="isMenuOpen">
      <div class="h-full w-full flex justify-center items-center">
        <ul class="flex flex-col justify-center space-y-6 text-center text-white font-bold">
          <li><router-link @click.native="isMenuOpen = false" to="sobre">Sobre</router-link></li>
          <li><router-link @click.native="isMenuOpen = false" to="sou-candidato">Sou um Candidato</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import AppLogo from '@/components/Logo.vue';

export default {
  name: 'Nav',
  components: {
    AppLogo,
  },
  data () {
    return {
      isMenuOpen: false,
    }
  },
  watch: {
    isMenuOpen(isMenuOpen) {
      if (isMenuOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }
}
</script>
