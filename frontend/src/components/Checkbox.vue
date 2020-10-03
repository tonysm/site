<template>
  <label class="flex items-center space-x-4">
    <input
        type="checkbox"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', !value)"
        class="appearance-none h-3 w-3 border border-gray-400 rounded focus:outline-none"
        :class="{'bg-primary-button border-transparent': value, 'bg-white': !value }"
    />
    <span><slot/></span>
  </label>
</template>

<script>
export default {
  name: "Checkbox",
  inheritAttrs: false,
  props: {
    value: Boolean,
  },
}
</script>
