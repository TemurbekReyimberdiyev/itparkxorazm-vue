<template>
  <nav class="flex items-center justify-between p-4 bg-gray-800 text-white">
    <h1 class="text-xl font-bold">MySite</h1>
    <div>
      <router-link to="/" class="ml-4 hover:text-yellow-400">Bosh sahifa</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
