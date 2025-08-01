<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/admin/stores/auth'
import { Lock, User, Eye, EyeOff } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/admin/components/ui/card'
import { Button } from '@/admin/components/ui/button'
import { Input } from '@/admin/components/ui/input'
import { Label } from '@/admin/components/ui/label'
import {
  Alert,
  AlertDescription,
} from '@/admin/components/ui/alert'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

const router = useRouter()
const auth = useAuthStore()

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!username.value.trim() || !password.value.trim()) return

  isLoading.value = true
  error.value = ''

  setTimeout(() => {
    if (username.value === 'admin' && password.value === 'admin123') {
      auth.login()
      router.push('/admin')
    } else {
      error.value = 'Login yoki parol noto‘g‘ri'
    }
    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
          <Lock class="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          IT O'quv Markazi
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Admin panelga kirish
        </p>
      </div>

      <Card class="shadow-lg">
        <CardHeader class="space-y-1">
          <CardTitle class="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit="handleSubmit" class="space-y-4">
            <Alert v-if="error" variant="destructive">
              <AlertDescription>{{ error }}</AlertDescription>
            </Alert>

            <div class="space-y-2">
              <Label for="username">Foydalanuvchi nomi</Label>
              <div class="relative">
                <User class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  v-model="username"
                  class="pl-10"
                  required
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="password">Parol</Label>
              <div class="relative">
                <Lock class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  v-model="password"
                  class="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  @click="showPassword = !showPassword"
                >
                  <component :is="showPassword ? EyeOff : Eye" class="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              class="w-full"
              :disabled="isLoading || !username.trim() || !password.trim()"
            >
              {{ isLoading ? 'Kirmoqda...' : 'Kirish' }}
            </Button>
          </form>

          <div class="mt-6 p-4 bg-muted/50 rounded-lg">
            <p class="text-sm text-muted-foreground mb-2">Demo uchun:</p>
            <div class="space-y-1 text-xs">
              <p><strong>Foydalanuvchi:</strong> admin</p>
              <p><strong>Parol:</strong> admin123</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="text-center mt-6">
        <p class="text-xs text-muted-foreground">
          © 2024 IT O'quv Markazi. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  </div>
</template>
