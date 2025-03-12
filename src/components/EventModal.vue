<template>
  <ItemModal v-model="store.isShowEvent">
    <div class="">
      <div class="modal__img">
        <img
          class=""
          :src="config.STRAPI_URL + store.contentEvent?.picture"
        >
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { useItemModalStore } from '@/stores/itemModal'
import config from '@/config'

const store = useItemModalStore()
</script>

<style scoped>
.modal__img > img {
  width: 100%;
}
</style>
