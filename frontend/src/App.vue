<template>
  <div class="bg-flux-visitor min-h-screen flex flex-col relative justify-between">
    <app-nav/>
    <router-view class="flex-1"/>
    <app-footer />
  </div>
</template>

<script>
import AppNav from '@/components/Nav.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  name: 'AppLayout',
  components: {
    AppNav,
    AppFooter,
  },
}
</script>
