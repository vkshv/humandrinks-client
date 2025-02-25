import { createRouter, createWebHistory } from 'vue-router'
import AuthPhone from '../views/AuthPhoneView.vue'
import AuthVerification from '../views/AuthVerificationView.vue'
import AuthAccount from '../views/AuthAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/enter-phone',
      name: 'auth-phone',
      component: AuthPhone
    },
    {
      path: '/enter-code',
      name: 'auth-verification',
      component: AuthVerification
    },
    {
      path: '/create-account',
      name: 'auth-account',
      component: AuthAccount
    },
  ]
})

export default router
