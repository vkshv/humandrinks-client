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
  const isShowMerch = ref(false)
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

  function openMerch(data: IMerchItem) {
    isShowMerch.value = true
    contentMerch.value = data
  }

  return {
    isShowFood,
    isShowDrink,
    isShowEvent,
    isShowMerch,
    contentFood,
    contentDrink,
    contentEvent,
    contentMerch,
    openFood,
    openDrink,
    openEvent,
    openMerch
  }
})
