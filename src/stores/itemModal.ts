import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  IFoodItem,
  IDrinkItem,
  IEventItem,
  IMerchItem,
  IWhatsnewItem
} from '@/types/content'

export const useItemModalStore = defineStore('itemModal', () => {
  const isShowFood = ref(false)
  const isShowDrink = ref(false)
  const isShowEvent = ref(false)
  const isShowEventHowItWorks = ref(false)
  const isShowMerch = ref(false)
  const isShowMerchHowItWorks = ref(false)
  const isShowBonus = ref(false)
  const isShowWhatsnew = ref(false)
  const contentFood = ref<IFoodItem | null>(null)
  const contentDrink = ref<IDrinkItem | null>(null)
  const contentEvent = ref<IEventItem | null>(null)
  const contentMerch = ref<IMerchItem | null>(null)
  const contentWhatsnew = ref<IWhatsnewItem | null>(null)

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

  function openWhatsnew(data: IWhatsnewItem) {
    isShowWhatsnew.value = true
    contentWhatsnew.value = data
  }

  return {
    isShowFood,
    isShowDrink,
    isShowEvent,
    isShowEventHowItWorks,
    isShowMerch,
    isShowMerchHowItWorks,
    isShowBonus,
    isShowWhatsnew,
    contentFood,
    contentDrink,
    contentEvent,
    contentMerch,
    contentWhatsnew,
    openFood,
    openDrink,
    openEvent,
    openEventHowItWorks,
    openMerch,
    openMerchHowItWorks,
    openBonus,
    openWhatsnew
  }
})
