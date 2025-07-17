<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white shadow transition-all">
    <div class="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-3">
        <img src="../assets/images/logo.svg" alt="IT Park Xorazm" class="w-40 h-15" />
      </a>

      <!-- Desktop menyu -->
      <div class="hidden lg:flex space-x-8 items-center text-lg">
        <a href="/" class="font-medium text-gray-800 hover:text-[#7dba28]">Bosh sahifa</a>
        <a href="#about" class="font-medium text-gray-800 hover:text-[#7dba28]">Biz haqimizda</a>
        <a href="#courses" class="font-medium text-gray-800 hover:text-[#7dba28]">Kurslar</a>
        <a href="#contact" class="font-medium text-gray-800 hover:text-[#7dba28]">Bog'lanish</a>
      </div>

      <!-- Desktop aloqa qismi -->
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
        <PhoneDropdown />
        <LanguageDropdown />
      </div>

      <!-- Mobil menyu tugmasi -->
      <button class="lg:hidden" @click="isMobileMenuOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobil menyu modal -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen"
           class="fixed top-0 left-0 w-full h-full z-50 bg-white px-6 py-4 flex flex-col space-y-6 transition-transform duration-300 overflow-y-auto">
        
        <!-- Yuqori qism: logo + yopish -->
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center space-x-3">
            <img src="../assets/images/logo.svg" alt="IT Park Xorazm" class="w-32 h-auto" />
          </a>
          <button @click="isMobileMenuOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#7dba28]" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menyu havolalari -->
        <div class="flex flex-col text-lg space-y-4 text-gray-900 font-medium mt-4">
          <a href="/" @click="closeMenu">Bosh sahifa</a>
          <a href="#about" @click="closeMenu">Biz haqimizda</a>
          <a href="#courses" @click="closeMenu">Kurslar</a>
          <a href="#contact" @click="closeMenu">Bog'lanish</a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import PhoneDropdown from '../components/PhoneDropdown.vue'
import LanguageDropdown from '../components/LanguageDropdown.vue'
import { ref } from 'vue'
import { useBodyScrollLock } from '../composables/useBodyScrollLock.js'

export default {
  name: 'Navbar',
  components: {
    PhoneDropdown,
    LanguageDropdown
  },
  setup() {
    const isMobileMenuOpen = ref(false)

    // scroll lockni qo‘llash
    useBodyScrollLock(isMobileMenuOpen)

    const closeMenu = () => {
      isMobileMenuOpen.value = false
    }

    return {
      isMobileMenuOpen,
      closeMenu
    }
  }
}
</script>


<style scoped>
/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
