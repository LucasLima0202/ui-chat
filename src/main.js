import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'

import './assets/main.css'
import Aura from '@primevue/themes/aura'
          

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: false
            }
        },
    }
)
app.component('Button', Button)

app.mount('#app')
