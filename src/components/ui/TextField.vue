<template>
  <div :class="{
    [props.className]: true,
    [`${props.className}-error`]: !!props.error
  }">
    <input
      class="input"
      :value="computedValue"
      :type="computedType"
      :readonly="fakeInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @click="clickHandler"
      v-bind="$attrs"
    >
    <div style="position: relative;">
      <input
        style="position: absolute; bottom: 0; left: 0; opacity: 0;"
        v-if="fakeInput"
        ref="date_input_ref"
        :value="props.modelValue"
        :type="props.type"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
      >
    </div>
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
import { computed, ref } from 'vue'
import { formatDate } from '@/helpers'

const date_input_ref = ref(null)

const props = defineProps({
  modelValue: String,
  className: {
    type: String,
    default: 'text-field--default'
  },
  type: {
    type: String,
    default: 'text'
  },
  label: String,
  error: String
})

defineEmits(['update:modelValue'])

defineOptions({ inheritAttrs: false })

const computedValue = computed(() => {
  if (props.type === 'date') return formatDate(props.modelValue)
  return props.modelValue
})

const computedType = computed(() => {
  if (fakeInput.value) return 'text'
  return props.type
})

const fakeInput = computed(() => ['date', 'time'].includes(props.type))

function clickHandler() {
  if (!fakeInput.value) return
  (date_input_ref.value as HTMLInputElement | null)?.focus();
  (date_input_ref.value as HTMLInputElement | null)?.showPicker()
}
</script>

<style scoped>
</style>
