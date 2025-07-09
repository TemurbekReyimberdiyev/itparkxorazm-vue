import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // bu yerda router import qilamiz

import './assets/main.css' // agar tailwind bor bo‘lsa

const app = createApp(App)

app.use(router)  // bu yerda router’ni ulaymiz
app.mount('#app')