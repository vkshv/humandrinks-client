<template>
  <ItemModal v-model="store.isShowReferralBonus" full-height>
    <div class="modal">
      <div
        class="modal__picture"
        :style="{ backgroundImage: `url(${authStore.referralProgram?.referral_picture})` }"
      ></div>
      <div class="modal__title">
        {{ authStore.referralProgram?.referral_title }}
      </div>
      <div class="modal__description">
        {{ authStore.referralProgram?.referral_description }}
      </div>
      <div
        class="modal__qr"
        :style="{ backgroundImage: `url(${qrDataURL})` }"
      >
      </div>
      <div class="modal__close">
        <ui-button
          class-name="button--tertiary"
          @click="store.isShowReferralBonus = false"
        >
          Понятно
        </ui-button>
      </div>
    </div>
  </ItemModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// @ts-ignore
import QRCode from 'qrcode'
import { useItemModalStore } from '@/stores/itemModal'
import { useAuthStore } from '@/stores/auth'
import { QrActionType } from '@/const/common'

const store = useItemModalStore()
const authStore = useAuthStore()

const qrDataURL = ref('')

watch(() => store.isShowReferralBonus, (value) => {
  if (value) {
    const qrData = JSON.stringify({ ACTN: QrActionType.ACTIVATE_REFERRAL_PROGRAM, DT: authStore.initData?.user?.id })
    QRCode.toDataURL(qrData)
      .then((dataURL: string) => {
        qrDataURL.value = dataURL
      })
  }
})
</script>

<style scoped>
.modal {
  padding-bottom: var(--bottom-spacer-height);
  /* background-color: var(--color-gray-white); */
}

.modal__picture {
  position: relative;
  border-radius: 0 0 16px 16px;
  aspect-ratio: 1 / 1;
  background-position: 50% 50%;
  background-size: cover;
}

.modal__title {
  margin-top: 4px;
  padding: 0 16px;
  font: var(--font-header-h4);
  color: var(--color-gray-gray-1);
}

.modal__description {
  margin-top: 12px;
  padding: 0 16px;
  font: var(--font-body-b3);
  color: var(--color-gray-gray-1);
}

.modal__qr {
  margin-top: 24px;
  padding: 0 16px;
  aspect-ratio: 1 / 1;
  background-position: 50% 50%;
  background-size: contain;
}

.modal__close {
  height: 56px;
  margin-top: 40px;
  padding: 0 16px;
}

.modal__close > button {
  position: fixed;
  bottom: var(--bottom-spacer-height);
  left: 16px;
  width: calc(100% - 32px);
}
</style>
