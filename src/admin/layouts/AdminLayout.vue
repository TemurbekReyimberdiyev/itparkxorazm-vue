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
      @update:page="currentPage = $event"
      @logout="handleLogout"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden ml-0 md:ml-64">
      <!-- Mobile header -->
      <Header @toggle-sidebar="toggleSidebar" @logout="handleLogout" />

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

<script setup>
import { ref } from 'vue'
import AdminSidebar from '@/admin/views/AdminSidebar.vue'
import Header from '@/admin/views/Header.vue'
import Dashboard from '@/admin/views/Dashboard.vue'
import Mentors from '@/admin/views/Mentors.vue'
import Categories from '@/admin/views/Categories.vue'
import Courses from '@/admin/views/Courses.vue'
import Skills from '@/admin/views/Skills.vue'
import Requests from '@/admin/views/Requests.vue'
import News from '@/admin/views/News.vue'
import { useAuthStore } from '@/admin/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const currentPage = ref('dashboard')
const isSidebarOpen = ref(false)
const username = 'Admin'

function handleLogout() {
  auth.logout()
  router.push('/admin/login')
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
