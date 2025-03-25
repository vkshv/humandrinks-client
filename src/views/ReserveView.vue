<template>
  <div class="reserve-view">
    <div class="top-spacer-footer"></div>
    <div class="title">бронь стола</div>
    <div
      v-if="currentEvent"
      class="event"
    >
      <div
        class="event__img"
        :style="{ backgroundImage: `url(${config.STRAPI_URL + currentEvent.picture})` }"
      >
        <div
          v-if="currentEvent.almostFull"
          class="event__almost-full"
        >мало мест</div>
      </div>
      <div class="event__title">
        {{ currentEvent.title }}
      </div>
      <div class="event__date">
        {{ formatDate(currentEvent.date) }}
      </div>
    </div>
    <div class="field field_date">
      <ui-text-field
        v-model="date"
        type="date"
        class-name="text-field--primary-extended"
        label="Когда"
        :disabled="!!currentEvent"
        :error="dateError"
        @input="dateError = ''"
      />
    </div>
    <div class="field">
      <ui-text-field
        v-model="time"
        type="time"
        class-name="text-field--primary-extended"
        label="Время"
        :disabled="!!currentEvent"
        :error="timeError"
        @input="timeError = ''"
      />
    </div>
    <div class="field">
      <ui-counter-field
        v-model="counter"
        :min-value="1"
        :max-value="99"
        label="Кол-во гостей"
      />
    </div>
    <div
      v-if="currentEvent"
      class="price"
    >
      <div class="price__title">стоимость</div>
      <div class="price__value">
        <div class="">{{ currentEvent.price }} ₽</div>
        <template v-if="currentEvent.bonusPayment">
          <div class="price__separator">/</div>
          <div class="price__bonus">
            {{ currentEvent.bonusPrice }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.7433 1.06324C9.84092 1.11757 9.91752 1.20303 9.9609 1.30597C10.0043 1.40892 10.0119 1.52343 9.98264 1.63124L8.65464 6.49991H13.5C13.5974 6.49991 13.6927 6.52839 13.7742 6.58184C13.8557 6.63529 13.9198 6.71138 13.9586 6.80075C13.9974 6.89013 14.0092 6.9889 13.9927 7.08493C13.9761 7.18095 13.9318 7.27004 13.8653 7.34124L6.8653 14.8412C6.78906 14.9231 6.68757 14.977 6.57705 14.9944C6.46654 15.0118 6.35339 14.9916 6.25571 14.9371C6.15803 14.8825 6.08145 14.7968 6.03823 14.6936C5.99501 14.5905 5.98764 14.4758 6.0173 14.3679L7.3453 9.4999H2.49997C2.40253 9.4999 2.30721 9.47142 2.22574 9.41797C2.14426 9.36452 2.08018 9.28843 2.04137 9.19906C2.00256 9.10968 1.99071 9.01091 2.00728 8.91488C2.02385 8.81886 2.06812 8.72977 2.13464 8.65857L9.13464 1.15857C9.21088 1.077 9.31223 1.0233 9.42254 1.00602C9.53285 0.988746 9.64577 1.00889 9.7433 1.06324Z" fill="#D45135"/>
            </svg>
          </div>
        </template>
      </div>
      <div class="price__info">
        <div>оплата на месте</div>
        <div v-if="currentEvent.bonusPayment">можно бонусами</div>
      </div>
    </div>
    <div class="reserve">
      <div v-if="currentEvent?.bonusPayment" class="reserve__bonus">
        Бонусы <span>{{ authStore.userRegData.bonus }}</span>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.91643 0.863882C7.99574 0.908026 8.05799 0.977459 8.09323 1.0611C8.12848 1.14475 8.13469 1.23779 8.11089 1.32538L7.03189 5.28117H10.9687C11.0479 5.28118 11.1253 5.30432 11.1915 5.34774C11.2577 5.39117 11.3098 5.45299 11.3413 5.52561C11.3729 5.59823 11.3825 5.67848 11.369 5.7565C11.3556 5.83452 11.3196 5.9069 11.2656 5.96476L5.57806 12.0585C5.51611 12.125 5.43365 12.1688 5.34386 12.183C5.25406 12.1971 5.16213 12.1807 5.08277 12.1364C5.0034 12.0921 4.94118 12.0224 4.90606 11.9386C4.87095 11.8548 4.86496 11.7616 4.88906 11.6739L5.96806 7.71867H2.03122C1.95205 7.71867 1.87461 7.69553 1.80841 7.6521C1.74221 7.60868 1.69015 7.54685 1.65862 7.47423C1.62708 7.40161 1.61745 7.32136 1.63092 7.24334C1.64438 7.16533 1.68034 7.09294 1.73439 7.03509L7.42189 0.94134C7.48384 0.875065 7.56619 0.831432 7.65582 0.817394C7.74544 0.803356 7.83719 0.819721 7.91643 0.863882Z" fill="#11110F"/>
        </svg>
      </div>
      <ui-button
        class-name="button--primary"
        @click="reserve"
      >
        забронировать
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '@/stores/content'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { formatDate } from '@/helpers'
import config from '@/config'

const contentStore = useContentStore()
const authStore = useAuthStore()
const route = useRoute()

const date = ref('')
const time = ref('')
const counter = ref(1)

const dateError = ref('')
const timeError = ref('')

const hasError = computed(() => {
  return dateError.value || time.value
})

function validate() {
  if (!date.value) dateError.value = 'Не заполнено'
  if (!time.value) timeError.value = 'Не заполнено'
}

const currentEvent = computed(() => {
  if (!route.query.event) return
  return contentStore.eventItems.find((e) => e.documentId === route.query.event)
})

onMounted(() => {
  if (currentEvent.value) {
    date.value = currentEvent.value.date
    time.value = currentEvent.value.time
  }
})

function reserve() {
  validate()
  if (hasError.value) return

  // 
}
</script>

<style scoped>
.reserve-view {
  min-height: var(--safe-viewport-height);
  display: grid;
  grid-template-rows: repeat(7, max-content) 1fr;
}

.top-spacer-footer {
  position: sticky;
  top: var(--top-spacer-height);
  height: 12px;
  border-radius: 0 0 12px 12px;
  background-color: var(--color-accent-rust);
}

.title {
  margin-top: 24px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.event {
  justify-self: center;
  margin-top: 24px;
}

.event__img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 54px;
  background-position: 50% 50%;
  background-size: cover;
}

.event__almost-full {
  padding: 4px 8px;
  border-radius: 18px;
  background-color: var(--color-gray-white);
  color: var(--color-gray-gray-1);
  font: var(--font-caption-c2-bold);
}

.event__title {
  margin-top: 8px;
  font: var(--font-caption-c1-bold);
  color: var(--color-gray-gray-1);
  text-align: center;
  text-transform: lowercase;
}

.event__date {
  margin-top: 2px;
  font: var(--font-caption-c2);
  color: var(--color-gray-gray-4);
  text-align: center;
}

.field {
  margin-top: 8px;
  padding: 0 16px;
}

.field_date {
  margin-top: 24px;
}

.price {
  display: grid;
  justify-content: center;
  margin-top: 40px;
}

.price__title {
  font: var(--font-body-b2);
  color: var(--color-gray-gray-1);
  text-align: center;
}

.price__value {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  margin-top: 8px;
  padding: 0 16px;
  font: var(--font-header-h2);
  color: var(--color-gray-gray-1);
}

.price__separator {
  color: var(--color-gray-gray-5);
}

.price__bonus {
  color: var(--color-accent-rust);
}

.price__info {
  display: flex;
  column-gap: 4px;
  margin-top: 16px;
  padding: 0 16px;
  font: var(--font-body-b3);
  color: var(--color-gray-gray-4);
}

.price__info div::after {
  content: '·';
  padding-left: 4px;
}

.price__info div:last-child::after {
  display: none;
}

.reserve {
  grid-row: 8 / 9;
  align-self: end;
  margin-top: 64px;
  margin-bottom: var(--bottom-spacer-height);
  padding: 0 16px;
}

.reserve__bonus {
  justify-self: center;
  display: flex;
  align-items: center;
  column-gap: 4px;
  height: 32px;
  margin-bottom: 16px;
  padding: 0 12px;
  border-radius: 32px;
  font: var(--font-body-b1-bold);
  background-color: var(--color-accent-yellow);
}

.reserve__bonus > span {
  font: 400 18px/18px Biform;
}
</style>
