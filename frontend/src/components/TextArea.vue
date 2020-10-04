<template>
  <div>
    <label v-if="label" class="block text-disabled-button text-sm font-bold mb-2" :id="$attrs['id']">
      {{ label }}
    </label>
    <textarea
        class="shadow appearance-none border border-border-button rounded w-full p-3 text-disabled-button leading-tight focus:outline-none focus:shadow-outline"
        v-bind="$attrs"
        :value="value"
        rows="8"
        @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  inheritAttrs: false,
  props: {
    label: String,
    value: String,
  }
}
</script>
