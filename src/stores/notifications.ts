import { ref } from 'vue'
import { defineStore } from 'pinia'
import { NotificationType } from '@/const/notifications'
import type { INotification } from '@/types/notifications'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<INotification[]>([])
  const counter = ref<number>(0)

  function add({
    type,
    message,
    path,
    delay = 8000
  }: {
    type: NotificationType,
    message: string,
    path?: string,
    delay?: number
  }) {
    const id = counter.value++
    notifications.value.push({ id, type, message, path })
    setTimeout(() => remove(id), delay)
  }

  function remove(id: number) {
    notifications.value = notifications.value.filter((e) => e.id !== id)
  }

  function success(message: string, path?: string) {
    add({ type: NotificationType.SUCCESS, message, path })
  }

  function info(message: string, path?: string) {
    add({ type: NotificationType.INFO, message, path })
  }

  function error(message: string, path?: string) {
    add({ type: NotificationType.ERROR, message, path })
  }

  return {
    notifications,
    add,
    success,
    info,
    error
  }
})
