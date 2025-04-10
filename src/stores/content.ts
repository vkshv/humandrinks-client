import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IFoodItem, IDrinkItem, IEventItem, IMerchItem, IFoodCategoriesItem, IDrinkCategoriesItem, IWhatsnewItem } from '@/types/content'
import http from '@/services/http'

export const useContentStore = defineStore('content', () => {
  const foodItems = ref<IFoodItem[]>([])
  const foodCategories = ref<IFoodCategoriesItem[]>([])
  const drinkItems = ref<IDrinkItem[]>([])
  const drinkCategories = ref<IDrinkCategoriesItem[]>([])
  const eventItems = ref<IEventItem[]>([])
  const eventCategories = ref<string[]>([])
  const merchItems = ref<IMerchItem[]>([])
  const whatsnewItems = ref<IWhatsnewItem[]>([])

  async function loadFoodItems() {
    if (foodItems.value.length) return
    const response = await http.get('content/food-items')
    foodItems.value = response.data
  }

  async function loadFoodCategories() {
    if (foodCategories.value.length) return
    const response = await http.get('content/food-categories')
    foodCategories.value = response.data
  }

  async function loadDrinkItems() {
    if (drinkItems.value.length) return
    const response = await http.get('content/drink-items')
    drinkItems.value = response.data
  }

  async function loadDrinkCategories() {
    if (drinkCategories.value.length) return
    const response = await http.get('content/drink-categories')
    drinkCategories.value = response.data
  }

  async function loadEventItems() {
    if (eventItems.value.length) return
    const response = await http.get('content/event-items')
    eventItems.value = response.data
  }

  async function loadEventCategories() {
    if (eventCategories.value.length) return
    const response = await http.get('content/event-categories')
    eventCategories.value = response.data
  }

  async function loadMerchItems() {
    if (merchItems.value.length) return
    const response = await http.get('content/merch-items')
    merchItems.value = response.data
  }

  async function loadWhatsnewItems() {
    if (whatsnewItems.value.length) return
    const response = await http.get('content/whats-new-items')
    whatsnewItems.value = response.data
  }

  async function sendBotMessage(data: any) {
    const response = await http.post('content/send', data)
    return response
  }

  return {
    foodItems,
    foodCategories,
    drinkItems,
    drinkCategories,
    eventItems,
    eventCategories,
    merchItems,
    whatsnewItems,
    loadFoodItems,
    loadFoodCategories,
    loadDrinkItems,
    loadDrinkCategories,
    loadEventItems,
    loadEventCategories,
    loadMerchItems,
    loadWhatsnewItems,
    sendBotMessage
  }
})
