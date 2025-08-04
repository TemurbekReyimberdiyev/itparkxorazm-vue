<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Mobil backdrop -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <AdminSidebar
      :currentPage="currentPage"
      :username="username"
      :isOpen="isSidebarOpen"
      :isMobile="true"
      @update:page="handlePageChange"
      @close-sidebar="isSidebarOpen = false"
      @logout="handleLogout"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden ml-0 md:ml-64">
      <!-- Mobile header -->
      <Header
        :currentPage="currentPage"
        :pageTitle="getPageTitle(currentPage)"
        :username="username"
        @toggle-sidebar="toggleSidebar"
        @logout="handleLogout"
        @page-change="handlePageChange"
      />

      <!-- Sahifa kontenti -->
      <main class="flex-1 p-4 overflow-y-auto">
        <Dashboard v-if="currentPage === 'dashboard'" />
        <Mentors v-else-if="currentPage === 'mentors'" />
        <Categories v-else-if="currentPage === 'categories'" />
        <Courses v-else-if="currentPage === 'courses'" />
        <Skills v-else-if="currentPage === 'skills'" />
        <Requests v-else-if="currentPage === 'requests'" />
        <News v-else-if="currentPage === 'news'" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/admin/stores/auth'

// Komponentlar
import AdminSidebar from '@/admin/views/AdminSidebar.vue'
import Header from '@/admin/views/Header.vue'
import Dashboard from '@/admin/views/Dashboard.vue'
import Mentors from '@/admin/views/Mentors.vue'
import Categories from '@/admin/views/Categories.vue'
import Courses from '@/admin/views/Courses.vue'
import Skills from '@/admin/views/Skills.vue'
import Requests from '@/admin/views/Requests.vue'
import News from '@/admin/views/News.vue'

// Auth va router
const auth = useAuthStore()
const router = useRouter()

// LocalStorage dan so‘nggi ochilgan sahifani olish
const savedPage = localStorage.getItem('currentPage') || 'dashboard'
const currentPage = ref(savedPage)
const isSidebarOpen = ref(false)
const username = 'Admin'

// Sahifani o‘zgartirish va saqlash
function handlePageChange(page: string) {
  currentPage.value = page
  localStorage.setItem('currentPage', page) // LocalStorage ga saqlash
  isSidebarOpen.value = false // Mobil holatda menyuni yopish
}

// Logout
function handleLogout() {
  auth.logout()
  router.push('/admin/login')
}

// Mobil sidebar toggle
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Sahifa sarlavhalari
function getPageTitle(page: string): string {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    mentors: 'Mentorlar',
    categories: 'Kategoriyalar',
    courses: 'Kurslar',
    skills: 'Ko‘nikmalar',
    requests: 'So‘rovlar',
    news: 'Yangiliklar',
  }
  return titles[page] || 'Admin Panel'
}
</script>
