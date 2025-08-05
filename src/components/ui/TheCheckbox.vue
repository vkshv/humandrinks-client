<template>
  <div
    class="ui-checkbox"
    @click="$emit('update:modelValue', !props.modelValue)"
  >
    <input
      type="checkbox"
      :checked="modelValue"
    >
    <div class="custom-checkbox">
      <svg v-if="props.modelValue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" fill="#D45135" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
      </svg>
    </div>
    <label>{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  label: String
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineOptions({ inheritAttrs: false })
</script>

<style scoped>
.ui-checkbox {
  display: flex;
  align-items: start;
  column-gap: 6px;
}

.ui-checkbox > input {
  display: none;
}

.ui-checkbox > .custom-checkbox {
  transform: translateY(-5px);
}

.ui-checkbox > .custom-checkbox > svg {
  width: 24px;
}

.ui-checkbox > label {
  font: var(--font-caption-c1-bold);
  color: var(--color-gray-gray-1);
}
</style>
