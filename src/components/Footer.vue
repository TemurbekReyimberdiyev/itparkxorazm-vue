<template>
  <footer class="bg-[#7dba28] text-white">
    <div class="max-w-7xl mx-auto px-10 py-16">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        <!-- Logo + Description + Social Icons -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <img src="@/assets/images/logo.svg" alt="IT Park Xorazm" class="w-8 h-8" />
            <span class="text-xl font-bold">IT Park Xorazm</span>
          </div>
          <p class="text-white/80 leading-relaxed">
            Biz zamonaviy IT ta'limni Xorazmda rivojlantiramiz. O'quvchilarimizga sifatli va amaliy bilim beramiz.
          </p>
          <div class="flex space-x-4">
            <a href="https://www.instagram.com/itpark_xorazm_/" target="_blank" class="p-2 rounded-full bg-white/10 hover:text-pink-400 transition-colors" aria-label="Instagram">
              <img src="@/assets/images/instagram.svg" alt="Instagram" class="w-5 h-5" />
            </a>
            <a href="https://t.me/xorazm_it_park" target="_blank" class="p-2 rounded-full bg-white/10 hover:text-blue-400 transition-colors" aria-label="Telegram">
              <img src="@/assets/images/telegram.svg" alt="Telegram" class="w-5 h-5" />
            </a>
            <a href="https://youtube.com/@itpark_xorazm_" target="_blank" class="p-2 rounded-full bg-white/10 hover:text-red-500 transition-colors" aria-label="YouTube">
              <img src="@/assets/images/youtube.svg" alt="YouTube" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Tezkor havolalar -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Tezkor havolalar</h3>
          <ul class="space-y-2">
            <li><a href="#about" class="text-white/80 hover:text-white transition-colors">Biz haqimizda</a></li>
            <li><a href="#courses" class="text-white/80 hover:text-white transition-colors">Kurslar</a></li>
            <li><a href="#news" class="text-white/80 hover:text-white transition-colors">Yangiliklar</a></li>
          </ul>
        </div>

        <!-- Kurslar -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Kurslar</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">Frontend Development</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">Backend Development</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">Mobile Development</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">Data Science</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">UI/UX Design</a></li>
            <li><a href="#" class="text-white/80 hover:text-white transition-colors">DevOps Engineering</a></li>
          </ul>
        </div>

        <!-- Aloqa -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Aloqa ma'lumotlari</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <img src="@/assets/images/phone.png" alt="Phone" class="w-5 h-5 mt-0.5" />
              <div>
                <p class="text-white/80">+998 99 053 11 99</p>
                <p class="text-white/80">+998 93 150 11 99</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <img src="@/assets/images/location2.png" alt="Location" class="w-5 h-5 mt-0.5" />
              <div>
                <p class="text-white/80">Urganch shahar, Tinchlik 6-uy</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/20 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-white/80 text-sm">
            © 2025 IT Park Xorazm. Barcha huquqlar himoyalangan.
          </p>
          <div class="flex space-x-6 text-sm">
            <a href="#" class="text-white/80 hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" class="text-white/80 hover:text-white transition-colors">Foydalanish shartlari</a>
            <a href="#" class="text-white/80 hover:text-white transition-colors">Yordam</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
