import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from 'axios'

import "./icons" // icon
// styles
import '@/assets/styles/index.css'

import extensions from './extensions'

const app = createApp(App)

axios.defaults.baseURL = 'https://graphqlzero.almansi.me/api/'
app.provide('$axios', axios)
extensions(app, router, axios)

app.use(router)
app.use(store)
app.mount('#app')
