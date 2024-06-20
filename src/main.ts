import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
library.add(faSpinner)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
