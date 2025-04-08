<template>
  <div
    class="address-suggestion-field-component"
    :class="{
      'address-suggestion-field-component-error': props.error
    }"
    v-click-outside="clickOutsideHandler"
  >
    <div v-if="props.label" class="label-container">
      <div class="label">
        {{ props.label }}
      </div>
    </div>
    <textarea
      v-model="query"
      class="textarea"
      ref="textarea_ref"
      rows="1"
      @input="inputHandler"
      @focus="isShowDropdown = true"
    />
    <ul class="dropdown" v-show="isShowDropdown">
      <li
        class="dropdown__item"
        v-for="item in addresses"
        @click="clickHandler(item)"
      >{{ item.value }}</li>
    </ul>
  </div>
  <div
    v-if="props.error"
    class="error"
  >{{ props.error }}</div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { AddressSuggestion } from '@/types/auth'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const emit = defineEmits(['change', 'clickOutside', 'input:query'])

const textarea_ref = ref(null)

const query = ref('')
const addresses = ref<AddressSuggestion[]>([])
const isShowDropdown = ref(false)

const props = defineProps({
  label: String,
  error: String
})

watch(query, () => {
  resizeTextarea()
})

async function inputHandler(event) {
  emit('input:query', event)
  try {
    const response = await authStore.suggestAddress(query.value)
    addresses.value = response.data
  } catch (error) {}
}

function clickHandler(item: AddressSuggestion) {
  query.value = item.value
  emit('change', item)
  isShowDropdown.value = false
}

function clickOutsideHandler() {
  if (!isShowDropdown.value) return

  isShowDropdown.value = false
  emit('clickOutside', { query: query.value })
}

async function resizeTextarea() {
  await nextTick()
  const el = textarea_ref.value as unknown as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
</script>

<style scoped>
.address-suggestion-field-component {
  position: relative;
  padding: 0 20px 0 106px;
  border-radius: 12px;
  background-color: var(--color-gray-gray-8);
  box-sizing: border-box;
}

.address-suggestion-field-component-error {
  border: 1px solid var(--color-accent-rust);
}

.label-container {
  position: absolute;
  left: 20px;
  top: 0;
  width: 86px;
  height: 100%;
  padding: 12px 0;
  box-sizing: border-box;
}

.label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-right: 1px solid var(--color-gray-gray-6);
  color: var(--color-gray-gray-1);
  font: var(--font-body-b2);
}

.textarea {
  display: block;
  width: 100%;
  min-height: 56px;
  padding: 20px 20px 19px 20px;
  border: none;
  color: var(--color-gray-gray-1);
  background-color: transparent;
  outline: none;
  font: var(--font-body-b2-bold);
  box-sizing: border-box;
  resize: none;
}

.error {
  margin-top: 8px;
  color: var(--color-accent-rust);
  font: var(--font-caption-c1);
  text-align: center;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 16px;
  background-color: var(--color-gray-white);
  box-shadow: var(--shadow-small-shadow);
  box-sizing: border-box;
}

.dropdown__item {
  padding: 16px;
  font: var(--font-body-b2-bold);
  color: var(--color-gray-gray-1);
  border-bottom: 1px solid var(--color-gray-gray-7);
}

.dropdown__item:first-child {
  padding-top: 20px;
}

.dropdown__item:last-child {
  padding-bottom: 20px;
  border-bottom: none;
}
</style>
