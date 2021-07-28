import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

import "./icons" // icon
// styles
import '@/assets/styles/index.css'

import extensions from './extensions'

const app = createApp(App)

extensions(app)

app.use(router)
app.use(store)
app.mount('#app')
