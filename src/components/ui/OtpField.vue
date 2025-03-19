<template>
  <div :class="{
    [props.className]: true,
    [`${props.className}-error`]: !!props.error
  }">
    <div class="inputs">
      <input
        v-for="(_, index) in code"
        :key="index"
        v-mask="'#'"
        v-model="code[index]"
        :disabled="isDisabled(index)"
        inputmode="numeric"
        @input="handleInput(index)"
        @keydown.backspace="handleBackspace(index)"
        @paste="handlePaste"
        ref="inputs"
      />
    </div>
    <div
      v-if="!!props.error"
      class="error"
    >{{ props.error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  className: {
    type: String,
    default: 'otp-field--default'
  },
  error: String
})

const emit = defineEmits(['update:modelValue'])

defineOptions({ inheritAttrs: false })

const code = ref(['', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])

function isDisabled(index: number) {
  return code.value[index] !== '' || code.value[index - 1] === ''
}

function handleInput(index: number) {
  if (index < code.value.length - 1) {
    inputs.value[index + 1].focus()
  }
  emit('update:modelValue', code.value.join(''))
}

function handleBackspace(index: number) {
  if (index > 0) {
    code.value[index - 1] = ''
    setTimeout(() => {
      inputs.value[index - 1].focus()
    }, 0)
  }
  emit('update:modelValue', code.value.join(''))
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text').replace(/\D/g, '')

  if (pasted?.length === code.value.length) {
    code.value = pasted.split('')
    inputs.value[code.value.length - 1].focus()
  }
  emit('update:modelValue', code.value.join(''))
}

watch(() => props.modelValue, (value) => {
  const _code = ['', '', '', '']
  _code.forEach((_, i) => {
    if (value?.[i]) {
      _code[i] = value[i]
    }
  })
  code.value = _code
})
</script>

<style>
</style>
