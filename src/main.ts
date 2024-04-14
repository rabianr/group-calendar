import './assets/scss/styles.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n'
import App from './App.vue'

const app = createApp(App)

app.use(i18n)

app.use(createPinia())

app.mount('#app')
