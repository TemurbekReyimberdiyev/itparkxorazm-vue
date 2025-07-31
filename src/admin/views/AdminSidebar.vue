<template>
  <aside class="w-64 bg-white border-r border-gray-200 h-screen p-4">
    <div class="mb-4">
      <h2 class="text-lg font-semibold text-gray-700">IT O'quv Markazi</h2>
    </div>
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
  Newspaper
} from 'lucide-vue-next'

defineProps({
  currentPage: String
})

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
