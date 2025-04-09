<template>
  <div :class="{
    [props.className]: true,
    [`${props.className}-error`]: !!props.error
  }">

    <div class="label">
      {{ props.label }}
    </div>
    <button
      :disabled="props.modelValue as number <= props.minValue"
      @click="update(-1)"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="#141416"/>
      </svg>
    </button>
    <div class="value">{{ computedValue }}</div>
    <button
      :disabled="props.modelValue as number >= props.maxValue"
      @click="update(1)"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="#141416"/>
        <path d="M12 5L12 19" stroke="#141416"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

const props = defineProps({
  modelValue: Number,
  minValue: { type: Number, default: 0 },
  maxValue: { type: Number, default: Infinity },
  className: { type: String, default: 'counter-field--default' },
  label: String,
  error: String
})

const emit = defineEmits(['update:modelValue'])

defineOptions({ inheritAttrs: false })

onMounted(() => {
  if (props.modelValue === undefined) emit('update:modelValue', props.minValue)
  else if (props.modelValue < props.minValue) emit('update:modelValue', props.minValue)
  else if (props.modelValue > props.maxValue) emit('update:modelValue', props.maxValue)
})

const computedValue = computed(() => {
  if (props.modelValue === props.maxValue) return `${props.modelValue - 1}+`
  return props.modelValue?.toString()
})

function update(value: number) {
  emit('update:modelValue', props.modelValue as number + value)
}
</script>

<style scoped>
</style>
