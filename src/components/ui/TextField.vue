<template>
  <div :class="{
    [props.className]: true,
    [`${props.className}-error`]: !!props.error
  }">
    <input
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
    <div
      v-if="!!props.error"
      class="error"
    >{{ props.error }}</div>
    <div
      v-if="!!props.label"
      class="label"
    >{{ props.label }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  className: {
    type: String,
    default: 'text-field--default'
  },
  label: String,
  error: String
})

defineEmits(['update:modelValue'])

defineOptions({ inheritAttrs: false })
</script>

<style>
</style>
