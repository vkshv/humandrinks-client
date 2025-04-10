<template>
  <div class="overlay-container">
    <Transition>
      <div
        v-if="props.modelValue"
        class="overlay"
        @click="emit('update:modelValue', false)"
      >
      </div>
    </Transition>
  </div>
  <div class="modal-container">
    <Transition>
      <div
        v-if="props.modelValue"
        class="modal"
      >
        <div
          class="close"
          @click="emit('update:modelValue', false)"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_505_22213)">
            <path d="M16 32C24.753 32 32 24.7372 32 16C32 7.24705 24.7372 0 15.9843 0C7.24705 0 0 7.24705 0 16C0 24.7372 7.26273 32 16 32Z" fill="#11110F"/>
            <path d="M10.3683 23C9.60071 23 9 22.3819 9 21.6134C9 21.2458 9.13348 20.8949 9.40047 20.6443L14.0226 16L9.40047 11.3723C9.13348 11.105 9 10.7709 9 10.4033C9 9.61812 9.60071 9.03341 10.3683 9.03341C10.7521 9.03341 11.0524 9.16705 11.3194 9.41766L15.9749 14.062L20.6639 9.40095C20.9475 9.11695 21.2479 9 21.6149 9C22.3825 9 23 9.60143 23 10.3699C23 10.7542 22.8831 11.0549 22.5827 11.3556L17.944 16L22.5662 20.6277C22.8498 20.8783 22.9833 21.229 22.9833 21.6134C22.9833 22.3819 22.3659 23 21.5816 23C21.1978 23 20.8474 22.8664 20.5971 22.599L15.9749 17.9547L11.3695 22.599C11.1025 22.8664 10.7521 23 10.3683 23Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_505_22213">
            <rect width="32" height="32" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        <div :class="{
          'modal-content': true,
          'modal-content_full-height': props.fullHeight
        }">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  fullHeight: Boolean
})

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    document.body.classList.add('modal')
  } else {
    document.body.classList.remove('modal')
  }
})
</script>

<style scoped>
.overlay-container .v-enter-active,
.overlay-container .v-leave-active {
  transition: opacity 0.2s ease;
}

.overlay-container .v-enter-from,
.overlay-container .v-leave-to {
  opacity: 0;
}

.modal-container .v-enter-active,
.modal-container .v-leave-active {
  transition: transform 0.2s ease;
}

.modal-container .v-enter-from,
.modal-container .v-leave-to {
  transform: translateY(100%);
}

.overlay {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100vw;
  z-index: 9999;
}

.close {
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
  z-index: 1000;
}

.modal-content {
  max-height: calc(100vh - var(--top-spacer-height) - 22px);
  overflow-y: auto;
  border-radius: 16px 16px 0 0;
  background-color: var(--color-gray-white);
}

.modal-content_full-height {
  height: calc(100vh - var(--top-spacer-height) - 22px);
}
</style>
