import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  IFoodItem,
  IDrinkItem,
  IEventItem,
  IMerchItem
} from '@/types/content'

export const useItemModalStore = defineStore('itemModal', () => {
  const isShowFood = ref(false)
  const isShowDrink = ref(false)
  const isShowEvent = ref(false)
  const isShowEventHowItWorks = ref(false)
  const isShowMerch = ref(false)
  const isShowMerchHowItWorks = ref(false)
  const isShowBonus = ref(false)
  const contentFood = ref<IFoodItem | null>(null)
  const contentDrink = ref<IDrinkItem | null>(null)
  const contentEvent = ref<IEventItem | null>(null)
  const contentMerch = ref<IMerchItem | null>(null)

  function openFood(data: IFoodItem) {
    isShowFood.value = true
    contentFood.value = data
  }

  function openDrink(data: IDrinkItem) {
    isShowDrink.value = true
    contentDrink.value = data
  }

  function openEvent(data: IEventItem) {
    isShowEvent.value = true
    contentEvent.value = data
  }

  function openEventHowItWorks() {
    isShowEventHowItWorks.value = true
  }

  function openMerch(data: IMerchItem) {
    isShowMerch.value = true
    contentMerch.value = data
  }

  function openMerchHowItWorks() {
    isShowMerchHowItWorks.value = true
  }

  function openBonus() {
    isShowBonus.value = true
  }

  return {
    isShowFood,
    isShowDrink,
    isShowEvent,
    isShowEventHowItWorks,
    isShowMerch,
    isShowMerchHowItWorks,
    isShowBonus,
    contentFood,
    contentDrink,
    contentEvent,
    contentMerch,
    openFood,
    openDrink,
    openEvent,
    openEventHowItWorks,
    openMerch,
    openMerchHowItWorks,
    openBonus
  }
})
