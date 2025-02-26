import { createRouter, createWebHistory } from 'vue-router'
import AuthPhone from '../views/AuthPhoneView.vue'
import AuthVerification from '../views/AuthVerificationView.vue'
import AuthAccount from '../views/AuthAccountView.vue'
import App from '../views/AppView.vue'
import Feed from '../views/FeedView.vue'
import Menu from '../views/MenuView.vue'
import Merch from '../views/MerchView.vue'
import Events from '../views/EventsView.vue'
import Profile from '../views/ProfileView.vue'
import Reserve from '../views/ReserveView.vue'

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
    {
      path: '/',
      name: 'app',
      component: App,
      children: [
        {
          path: '/feed',
          name: 'app-feed',
          component: Feed
        },
        {
          path: '/menu',
          name: 'app-menu',
          component: Menu
        },
        {
          path: '/merch',
          name: 'app-merch',
          component: Merch
        },
        {
          path: '/events',
          name: 'app-events',
          component: Events
        },
        {
          path: '/profile',
          name: 'app-profile',
          component: Profile
        },
        {
          path: '/reserve',
          name: 'app-reserve',
          component: Reserve
        }
      ]
    }
  ]
})

export default router
