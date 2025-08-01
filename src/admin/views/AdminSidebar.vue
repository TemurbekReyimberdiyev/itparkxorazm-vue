<template>
  <aside class="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col justify-between z-40">

    <div>
      <!-- Logo yoki Sarlavha -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-gray-700">IT Park O'quv Markazi</h2>
      </div>

      <!-- Menu -->
      <nav>
        <ul class="space-y-1">
          <li
            v-for="item in menuItems"
            :key="item.id"
            class="rounded-lg overflow-hidden"
          >
            <button
              @click="$emit('update:page', item.id)"
              :class="[
                'flex items-center w-full px-4 py-2 gap-2 hover:bg-gray-100 transition',
                currentPage === item.id ? 'bg-gray-100 font-medium text-primary' : 'text-gray-700'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Footer: Admin info va Logout -->
    <div class="p-2">
      <Separator class="mb-2" />
      <div class="flex items-center gap-2 px-2 py-1 mb-2">
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User class="w-4 h-4 text-primary-foreground" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ username || 'Admin' }}</p>
          <p class="text-xs text-muted-foreground">Administrator</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        class="w-full"
        @click="handleLogout"
      >
        <LogOut class="w-4 h-4 mr-2" />
        Chiqish
      </Button>
    </div>
  </aside>
</template>

<script setup>
import {
  LayoutDashboard,
  FolderOpen,
  BookOpen,
  Users,
  Award,
  MessageCircle,
  Newspaper,
  LogOut,
  User,
} from 'lucide-vue-next'

import { Button } from '@/admin/components/ui/button'
import { Separator } from '@/admin/components/ui/separator'

const props = defineProps({
  currentPage: String,
  username: String
})

const emit = defineEmits(['update:page', 'logout'])

function handleLogout() {
  emit('logout')
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'categories', label: 'Kategoriyalar', icon: FolderOpen },
  { id: 'courses', label: 'Kurslar', icon: BookOpen },
  { id: 'mentors', label: 'Mentorlar', icon: Users },
  { id: 'skills', label: "Ko'nikmalar", icon: Award },
  { id: 'requests', label: "So'rovlar", icon: MessageCircle },
  { id: 'news', label: 'Yangiliklar', icon: Newspaper }
]
</script>

<style scoped>
.text-primary {
  color: #2563eb;
}
</style>
