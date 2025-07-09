<template>
  <nav class="flex items-center justify-between">
    <!-- Chap tomon: Logo -->
    <div class="flex items-center space-x-3">
      <img src="../assets/images/logo.svg" alt="IT Park Xorazm" class="w-40 h-20" />
      
    </div>

    <!-- O'rtada: Menu -->
    <div class="hidden lg:flex space-x-8 items-center text-lg">
      <router-link to="/" class="font-medium text-gray-800 hover:text-[#7dba28]">Bosh sahifa</router-link>
      <a href="#about" class="font-medium text-gray-800 hover:text-[#7dba28]">Biz haqimizda</a>
      <a href="#courses" class="font-medium text-gray-800 hover:text-[#7dba28]">Kurslar</a>
      <a href="#contact" class="font-medium text-gray-800 hover:text-[#7dba28]">Bog'lanish</a>
    </div>

    <!-- O'ng tomon: manzil, aloqa va til -->
    <div class="hidden lg:flex items-center space-x-4">
      <!-- Manzil -->
      <div class="flex items-center text-gray-700 text-sm space-x-1">
        <img src="../assets/images/location.png" alt="location" class="w-10 h-10" />
        <span class="text-gray-800 font-semibold">
          <span class="block">Urganch shahar.</span>
          <span class="block">Tinchlik ko‘chasi 6-uy</span>
        </span>
      </div>

      <!-- Headset ikonkasi -->
      <img src="../assets/images/headset.png" alt="headset" class="w-10 h-10" />

      <!-- Telefon tugmasi -->
      <a href="tel:+998990531199"
         class="bg-[#7dba28] font-semibold hover:bg-[#689a23] text-white px-4 py-2 rounded text-sm flex items-center space-x-1">
        <span>+998 99 053 11 99</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
        </svg>
      </a>

      <!-- Til tanlash -->
      <div class="flex items-center space-x-1 cursor-pointer text-sm text-gray-800 font-semibold">
        <img src="../assets/images/uzb.png" alt="flag" class="w-5 h-5 rounded-full" />
        <span>O‘ZB</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Mobil menyu tugmasi -->
    <button class="lg:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>
</template>

<script>

export default {
  name: 'Navbar'
}
</script>

<style scoped>
</style>
