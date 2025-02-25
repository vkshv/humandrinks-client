<template>
  <div class="">
    <input
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
    <div class="">{{ props.error }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  error: String
})

defineEmits(['update:modelValue'])
</script>

<style>
</style>
