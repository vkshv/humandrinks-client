<template>
  <div class="promocode-field-component">
    <div
      :class="{
        'field': true,
        'field-error': props.error,
        'field-success': props.success
      }"
    >
      <input
        :value="props.modelValue"
        :disabled="props.processing"
        :placeholder="props.placeholder"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <button
        :disabled="props.processing"
        @click="$emit('apply')"
      >
        <div v-if="!props.processing">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6L16 12L10 18" stroke="white" stroke-width="2"/>
          </svg>
        </div>
        <div v-else class="loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  error: String,
  success: String,
  processing: Boolean,
  placeholder: String
})

defineEmits(['update:modelValue', 'apply'])
</script>

<style scoped>
.promocode-field-component {}

.field {
  display: grid;
  grid-template-columns: 1fr max-content;
  column-gap: 20px;
  height: 56px;
  padding: 0 8px 0 20px;
  border: 1px solid var(--color-gray-gray-6);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  box-sizing: border-box;
}

.field > input {
  align-self: center;
  height: 54px;
  padding: 0;
  border: none;
  background-color: transparent;
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
  outline: none;
}

.field > input::placeholder {
  color: var(--color-gray-gray-1);
}

.field > button {
  align-self: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background-color: var(--color-accent-green);
}

.field > button > .loading {
  position: relative;
  width: 15px;
  height: 15px;
  margin: 0 auto;
  transform: translate(-1px, -8px);
}

.field > button > .loading > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 4.5px;
  border-radius: 2px;
  background-color: var(--color-gray-white);
  transform-origin: center 7.5px;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

.field > button > .loading > div:nth-child(1) { transform: rotate(0deg); animation-delay: -0.7s; }
.field > button > .loading > div:nth-child(2) { transform: rotate(45deg); animation-delay: -0.6s; }
.field > button > .loading > div:nth-child(3) { transform: rotate(90deg); animation-delay: -0.5s; }
.field > button > .loading > div:nth-child(4) { transform: rotate(135deg); animation-delay: -0.4s; }
.field > button > .loading > div:nth-child(5) { transform: rotate(180deg); animation-delay: -0.3s; }
.field > button > .loading > div:nth-child(6) { transform: rotate(225deg); animation-delay: -0.2s; }
.field > button > .loading > div:nth-child(7) { transform: rotate(270deg); animation-delay: -0.1s; }
.field > button > .loading > div:nth-child(8) { transform: rotate(315deg); animation-delay: 0s; }

.field-error > input {
  color: var(--color-accent-rust);
}

.field-success > input {
  color: var(--color-accent-green);
}
</style>
