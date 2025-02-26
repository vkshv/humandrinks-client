// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'

import Button from './components/ui/TheButton.vue'
import TextField from './components/ui/TextField.vue'
import OtpField from './components/ui/OtpField.vue'
import ItemModal from './components/ItemModal.vue'

import router from './router'

const app = createApp(App)

app.component('UiButton', Button)
app.component('UiTextField', TextField)
app.component('UiOtpField', OtpField)
app.component('ItemModal', ItemModal)

app.use(createPinia())
app.use(router)
app.use(VueTheMask)

app.mount('#app')
