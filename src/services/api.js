import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel API manzili
  withCredentials: true, // Agar cookie asosida autentifikatsiya bo‘lsa (Sanctum)
})

export default api