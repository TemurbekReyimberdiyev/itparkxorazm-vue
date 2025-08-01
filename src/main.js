import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // bu yerda router import qilamiz
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import './assets/main.css' // agar tailwind bor bo‘lsa

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)  // bu yerda router’ni ulaymiz
app.mount('#app')