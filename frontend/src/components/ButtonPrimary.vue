<template>
  <button
      class="px-2 py-3 rounded text-white"
      :class="{'bg-disabled-button': disabled, 'bg-primary-button': !disabled}"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style scoped>

</style>