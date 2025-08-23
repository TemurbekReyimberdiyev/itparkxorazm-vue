// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 🔑 Token localStorage dan o‘qiladi
  const token = ref<string | null>(localStorage.getItem('token'))

  // ✅ Reaktiv computed orqali auth status
  const isAuthenticated = computed(() => !!token.value)

  function login(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
  }
})
