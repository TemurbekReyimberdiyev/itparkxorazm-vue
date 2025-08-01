<template>
  <div class="flex">
    <!-- Sidebar -->
    <AdminSidebar :currentPage="currentPage" @update:page="currentPage = $event" />

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-y-auto">
      <Dashboard v-if="currentPage === 'dashboard'" />
      <Mentors v-else-if="currentPage === 'mentors'" />
      <Categories v-else-if="currentPage === 'categories'" />
      <Courses v-else-if="currentPage === 'courses'" />
      <Skills v-else-if="currentPage === 'skills'" />
      <Requests v-else-if="currentPage === 'requests'" />
      <News v-else-if="currentPage === 'news'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AdminSidebar from '@/admin/views/AdminSidebar.vue';
import Dashboard from '@/admin/views/Dashboard.vue';
import Mentors from '@/admin/views/Mentors.vue';
import Categories from '@/admin/views/Categories.vue';
import Courses from '@/admin/views/Courses.vue';
import Skills from '@/admin/views/Skills.vue';
import Requests from '@/admin/views/Requests.vue';
import News from '@/admin/views/News.vue';

const currentPage = ref('dashboard');
</script>

<style scoped>
</style>
