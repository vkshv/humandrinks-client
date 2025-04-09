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
    const response = await http.get('content/food-items')
    foodItems.value = response.data
  }

  async function loadFoodCategories() {
    const response = await http.get('content/food-categories')
    foodCategories.value = response.data
  }

  async function loadDrinkItems() {
    const response = await http.get('content/drink-items')
    drinkItems.value = response.data
  }

  async function loadDrinkCategories() {
    const response = await http.get('content/drink-categories')
    drinkCategories.value = response.data
  }

  async function loadEventItems() {
    const response = await http.get('content/event-items')
    eventItems.value = response.data
  }

  async function loadEventCategories() {
    const response = await http.get('content/event-categories')
    eventCategories.value = response.data
  }

  async function loadMerchItems() {
    const response = await http.get('content/merch-items')
    merchItems.value = response.data
  }

  async function loadWhatsnewItems() {
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
