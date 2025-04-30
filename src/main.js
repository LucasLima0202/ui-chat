import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

// Bootstrap (se for usar os dois)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Button from 'primevue/button'

// Seu estilo local
import './assets/main.css'
import Aura from '@primevue/themes/aura'
// PrimeVue styling completo
          

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
