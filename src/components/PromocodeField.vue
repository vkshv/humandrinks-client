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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6L16 12L10 18" stroke="white" stroke-width="2"/>
        </svg>
      </button>
    </div>
    <div v-if="props.error" class="error">{{ props.error }}</div>
    <div v-if="props.success" class="success">{{ props.success }}</div>
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
  border: 1px solid var(--color-gray-gray-8);
  border-radius: 12px;
  background-color: var(--color-gray-gray-8);
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
  color: var(--color-gray-gray-4);
}

.field > button {
  align-self: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background-color: var(--color-accent-green);
}

.field-error {
  border-color: var(--color-accent-rust);
}

.field-error > input {
  color: var(--color-accent-rust);
}

.field-success {
  border-color: var(--color-accent-green);
}

.field-success > input {
  color: var(--color-accent-green);
}

.error {
  margin-top: 8px;
  font: var(--font-caption-c1);
  color: var(--color-accent-rust);
  text-align: center;
}

.success {
  margin-top: 8px;
  font: var(--font-caption-c1);
  color: var(--color-accent-green);
  text-align: center;
}
</style>
