<template>
  <nav class="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/50 shadow transition-all">
    <div class="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
      <!-- Chap tomon: Logo -->
      <a href="/" class="flex items-center space-x-3">
        <img src="../assets/images/logo.svg" alt="IT Park Xorazm" class="w-40 h-15" />
      </a>

      <!-- O'rtada: Menu -->
      <div class="hidden lg:flex space-x-8 items-center text-lg">
        <!-- <router-link to="/" class="font-medium text-gray-800 hover:text-[#7dba28]">Bosh sahifa</router-link> -->
        <a href="/" class="font-medium text-gray-800 hover:text-[#7dba28]">Bosh sahifa</a>
        <a href="#about" class="font-medium text-gray-800 hover:text-[#7dba28]">Biz haqimizda</a>
        <a href="#courses" class="font-medium text-gray-800 hover:text-[#7dba28]">Kurslar</a>
        <a href="#contact" class="font-medium text-gray-800 hover:text-[#7dba28]">Bog'lanish</a>
      </div>

      <!-- O'ng tomon: manzil, aloqa va til -->
      <div class="hidden lg:flex items-center space-x-4">
          
        <a href="https://yandex.uz/maps/-/CHwP7E-q" target="_blank" rel="noopener"
          class="flex items-center text-gray-700 text-sm space-x-1">
          <img src="../assets/images/location.png" alt="location" class="w-10 h-10" />
          <span class="text-gray-800 font-semibold">
            <span class="block">Urganch shahar.</span>
            <span class="block">Tinchlik ko‘chasi 6-uy</span>
          </span>
        </a>


        <img src="../assets/images/headset.png" alt="headset" class="w-10 h-10" />

        <!-- <a href="tel:+998990531199"
           class="bg-[#7dba28] font-semibold hover:bg-[#689a23] text-white px-4 py-2 rounded text-sm flex items-center space-x-1">
          <span>+998 99 053 11 99</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 9l-7 7-7-7" />
          </svg>
        </a> -->

        <PhoneDropdown />

        <!-- <div class="flex items-center space-x-1 cursor-pointer text-sm text-gray-800 font-semibold">
          <img src="../assets/images/uzb.png" alt="flag" class="w-5 h-5 rounded-full" />
          <span>O‘ZB</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 9l-7 7-7-7" />
          </svg>
        </div> -->

        <LanguageDropdown />
      </div>

      <!-- Mobil menyu tugmasi -->
      <button class="lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800"
             fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
import PhoneDropdown from '../components/PhoneDropdown.vue'
import LanguageDropdown from '../components/LanguageDropdown.vue';
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
export default {
  name: 'Navbar',
  components: {
    PhoneDropdown, LanguageDropdown
  }
}
</script>
