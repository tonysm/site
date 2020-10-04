<template>
  <div>
    <label v-if="label" class="block text-sm font-bold mb-2" :id="$attrs['id']">
      {{ label }}
    </label>
    <input
        class="shadow appearance-none border border-border-button text-center rounded w-full p-3 text-disabled-button leading-tight focus:outline-none focus:shadow-outline"
        :type="type"
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "TextField",
  inheritAttrs: false,
  props: {
    label: String,
    value: String,
    type: {
      type: String,
      default: 'text',
    }
  }
}
</script>
