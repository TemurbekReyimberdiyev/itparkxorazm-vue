<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white p-4">Admin Panel</header>
    <div class="flex flex-1">
      <aside class="w-64 bg-gray-100 p-4">Sidebar</aside>
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
