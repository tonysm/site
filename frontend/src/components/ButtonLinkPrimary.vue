<template>
  <router-link
      class="px-2 py-3 rounded text-white text-center"
      :class="{'bg-disabled-button': disabled, 'bg-primary-button': !disabled}"
      :disabled="disabled"
      :to="to"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "ButtonLinkPrimary",
  props: {
    to: {
      type: [String, Object],
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>