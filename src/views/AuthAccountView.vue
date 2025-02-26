<template>
  <div class="">
    <div class="">Фамилия</div>
    <div class="">
      <ui-text-field
        v-model="authStore.userRegData.surname"
        :error="surnameError"
        @input="surnameError = ''"
      />
    </div>
    <div class="">Имя</div>
    <div class="">
      <ui-text-field
        v-model="authStore.userRegData.name"
        :error="nameError"
        @input="nameError = ''"
      />
    </div>
    <div class="">Отчество</div>
    <div class="">
      <ui-text-field
        v-model="authStore.userRegData.patronymic"
        :error="patronymicError"
        @input="patronymicError = ''"
      />
    </div>
    <div class="">ДР</div>
    <div class="">
      <ui-text-field
        v-mask="'##.##.####'"
        placeholder="05.09.2000"
        v-model="authStore.userRegData.birth"
        :error="birthError"
        @input="birthError = ''"
      />
    </div>
    <div class="">Адрес</div>
    <div class="">
      <ui-text-field
        v-model="authStore.userRegData.address"
        :error="addressError"
        @input="addressError = ''"
      />
    </div>
    <div class="">Телефон</div>
    <div class="">
      <ui-text-field
        :value="authStore.phone"
        disabled
      />
    </div>
  </div>
  <div class="">
    <ui-button @click="register">
      Регистрация
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { STATUS_CODE } from '@/const/http'
import router from '@/router'

const appStore = useAppStore()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const surnameError = ref('')
const nameError = ref('')
const patronymicError = ref('')
const birthError = ref('')
const addressError = ref('')

const hasError = computed(() => {
  return surnameError.value || nameError.value || patronymicError.value || birthError.value || addressError.value
})

function validate() {
  if (!authStore.userRegData.surname) surnameError.value = 'Не заполнено'
  if (!authStore.userRegData.name) nameError.value = 'Не заполнено'
  if (!authStore.userRegData.patronymic) patronymicError.value = 'Не заполнено'
  if (!authStore.userRegData.birth) birthError.value = 'Не заполнено'
  if (!authStore.userRegData.address) addressError.value = 'Не заполнено'
}

async function register() {
  validate()
  if (hasError.value) return
  appStore.loader = true
  try {
    await authStore.register({
      name: authStore.userRegData.name,
      surname: authStore.userRegData.surname,
      patronymic: authStore.userRegData.patronymic,
      address: authStore.userRegData.address,
      phone: authStore.phone,
      birth: authStore.userRegData.birth
    })
  } catch (error: any) {
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      notificationsStore.error('Время жизни кода истекло. Пройдите регистрацию заново')
      router.push('/enter-phone')
    } else {
      notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
    }
  }
  try {
    const response = await authStore.authenticateUser(window.Telegram.WebApp.initData)
    const { token, ...userRegData } = response.data
    authStore.ACCESS_TOKEN = token
    authStore.userRegData = userRegData
    router.push('/feed')
  } catch (error) {
    notificationsStore.error('Что-то пошло не так. Повторите попытку позже')
  }
  appStore.loader = false
}
</script>

<style>
</style>
