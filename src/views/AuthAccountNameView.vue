<template>
  <div class="auth-account-name-view">
    <div class="top-spacer-footer"></div>
    <div class="title">Как вас зовут?</div>
    <div class="field">
      <ui-text-field
        v-model="authStore.userRegData.surname"
        class-name="text-field--primary-extended"
        placeholder="..."
        label="Фамилия"
      />
        <!-- :error="surnameError"
        @input="surnameError = ''" -->
    </div>
    <div class="field">
      <ui-text-field
        v-model="authStore.userRegData.name"
        class-name="text-field--primary-extended"
        placeholder="..."
        label="Имя"
      />
        <!-- :error="nameError"
        @input="nameError = ''" -->
    </div>
    <div class="field">
      <ui-text-field
        v-model="authStore.userRegData.patronymic"
        class-name="text-field--primary-extended"
        placeholder="..."
        label="Отчество"
      />
        <!-- :error="patronymicError"
        @input="patronymicError = ''" -->
    </div>
    <div class="next">
      <ui-button
        v-show="isShowAction"
        class-name="button--primary"
        @click="next"
      >
        Продолжить
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

// const surnameError = ref('')
// const nameError = ref('')
// const patronymicError = ref('')

// const hasError = computed(() => {
//   return surnameError.value || nameError.value || patronymicError.value
// })

const isShowAction = computed(() => {
  return authStore.userRegData.surname && authStore.userRegData.name && authStore.userRegData.patronymic // && !hasError.value
})

onMounted(() => {
  try {
    window.Telegram.WebApp.BackButton.show()
  } catch (error) {}
})

onUnmounted(() => {
  try {
    window.Telegram.WebApp.BackButton.hide()
  } catch (error) {}
})

// function validate() {
//   if (!authStore.userRegData.surname) surnameError.value = 'Не заполнено'
//   if (!authStore.userRegData.name) nameError.value = 'Не заполнено'
//   if (!authStore.userRegData.patronymic) patronymicError.value = 'Не заполнено'
// }

function next() {
  // validate()
  // if (hasError.value) return

  router.push('/create-account-other')
}
</script>

<style scoped>
.auth-account-name-view {
  min-height: var(--safe-viewport-height);
  display: grid;
  grid-template-rows: repeat(5, max-content) 1fr;
}

.top-spacer-footer {
  position: sticky;
  top: var(--top-spacer-height);
  height: 12px;
  border-radius: 0 0 12px 12px;
  background-color: var(--color-accent-rust);
}

.title {
  margin: 24px 0 16px 0;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.field {
  margin-top: 8px;
  padding: 0 8px;
}

.next {
  align-self: end;
  padding: 0 8px;
  margin-bottom: var(--bottom-spacer-height);
}
</style>
