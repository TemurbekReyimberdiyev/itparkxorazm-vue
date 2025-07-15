<template>
  <!-- To‘liq fon uchun div -->
  <div class="w-full bg-[#7dba28]">
    <footer class="max-w-7xl mx-auto text-white py-10 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Kompaniya -->
        <div>
          <h3 class="font-bold text-lg mb-4">Kompaniya</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:underline">Biz haqimizda</a></li>
            <li><a href="#" class="hover:underline">Kurslar</a></li>
            <li><a href="#" class="hover:underline">Yangiliklar</a></li>
          </ul>
        </div>

        <!-- Aloqa -->
        <div>
          <h3 class="font-bold text-lg mb-4">Aloqa markazi</h3>

          <div class="flex items-center gap-2 mb-2">
            <img src="@/assets/images/phone.png" alt="phone icon" class="w-5 h-5" />
            <p>+998 99 053 11 99</p>
          </div>

          <div class="flex items-center gap-2 mb-2">
            <img src="@/assets/images/phone.png" alt="phone icon" class="w-5 h-5" />
            <p>+998 93 150 11 99</p>
          </div>

          <div class="flex items-center gap-2">
            <img src="@/assets/images/location2.png" alt="location icon" class="w-5 h-5" />
            <p>Urganch shahar, Tinchlik 6-uy</p>
          </div>
        </div>


        <!-- Ijtimoiy tarmoqlar -->
        <div>
          <h3 class="font-bold text-lg mb-4">Biz ijtimoiy tarmoqlarda</h3>
          <div class="flex gap-6 mt-4">
            <a href="#" aria-label="Instagram" class="hover:scale-110 transition-transform">
              <img src="@/assets/images/instagram.svg" alt="Instagram" class="w-10 h-10">
            </a>
            <a href="#" aria-label="Telegram" class="hover:scale-110 transition-transform">
              <img src="@/assets/images/telegram.svg" alt="Telegram" class="w-10 h-10">
            </a>
            <a href="#" aria-label="YouTube" class="hover:scale-110 transition-transform">
              <img src="@/assets/images/youtube.svg" alt="YouTube" class="w-10 h-10">
            </a>
          </div>
        </div>

      </div>

      <div class="text-center mt-8 text-sm text-white/80">
        © 2025 IT Park Xorazm. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  </div>
</template>
