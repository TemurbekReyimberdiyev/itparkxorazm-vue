<template>
  <section class="p-8 max-w-7xl mx-auto">
    <!-- Sarlavha -->
    <h2 class="text-4xl font-bold text-[#7dba28] mb-8 text-center">O‘quv dasturlari</h2>

    <!-- Kategoriyalar -->
    <div class="flex flex-wrap justify-center gap-6 mb-10">
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">IT & Dasturlash</button>
      <button class="px-4 py-2 rounded-full border border-[#7dba28] bg-green-50 text-sm text-[#7dba28]">Media & Dizayn</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Marketing</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Marketing</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Xorijiy tillar</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">Robototexnika</button>
      <button class="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-green-50">IT Matematika</button>
    </div>

    <!-- Kurslar -->
    <div class="grid md:grid-cols-3 gap-8">
      <!-- 1-kurs -->
      <div class="rounded-2xl shadow-lg overflow-hidden">
        <div class="relative">
          <img src="../assets/images/graphic.png" alt="Grafik dizayn" class="w-full h-48 object-cover" />
          <span class="absolute top-2 right-2 bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">3 oy</span>
        </div>
        <div class="p-5 space-y-2">
          <span class="text-[#7dba28] text-xs font-semibold">Design</span>
          <h3 class="text-lg font-bold text-gray-900">Grafik dizayn</h3>
          <p class="text-gray-900 text-sm">"Figma va grafik dizaynni o‘rganib, UI/UX sohasida ish toping."</p>
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-2">
              <img src="../assets/images/humoyun.jpg" alt="Mentor" class="w-8 h-8 rounded-full object-cover" />
              <div class="text-xs text-gray-900">Madraximov Humoyun <br /><span class="text-gray-500">3-yil</span></div>
            </div>
            <div class="text-[#7dba28] font-bold text-base">$50</div>
          </div>
        </div>
      </div>

      <!-- 2-kurs -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="relative">
          <img src="../assets/images/video.jpg" alt="Video montaj" class="w-full h-48 object-cover" />
          <span class="absolute top-2 right-2 bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">3 oy</span>
        </div>
        <div class="p-5 space-y-2">
          <span class="text-[#7dba28] text-xs font-semibold">Design</span>
          <h3 class="text-lg font-bold text-gray-900">Video montaj</h3>
          <p class="text-gray-900 text-sm">"Video montaj asoslarini o‘rganib, kreativ videolar va kontent yarating."</p>
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-2">
              <img src="../assets/images/doston.jpg" alt="Mentor" class="w-8 h-8 rounded-full object-cover" />
              <div class="text-xs text-gray-900">Djumayev Doston <br /><span class="text-gray-500">15-yil</span></div>
            </div>
            <div class="text-[#7dba28] font-bold text-base">$70</div>
          </div>
        </div>
      </div>

      <!-- 3-kurs -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="relative">
          <img src="../assets/images/mobilography.jpg" alt="Mobilografiya" class="w-full h-48 object-cover" />
          <span class="absolute top-2 right-2 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">2 oy</span>
        </div>
        <div class="p-5 space-y-2">
          <span class="text-[#7dba28] text-xs font-semibold">Design</span>
          <h3 class="text-lg font-bold text-gray-900">Mobilografiya</h3>
          <p class="text-gray-900 text-sm">"Mobilografiya asoslarini o‘rganib, telefon orqali sifatli va kreativ videolar surating."</p>
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-2">
              <img src="../assets/images/alibek.jpg" alt="Mentor" class="w-8 h-8 rounded-full object-cover" />
              <div class="text-xs text-gray-900">Madraximov Alibek <br /><span class="text-gray-500">1-yil</span></div>
            </div>
            <div class="text-[#7dba28] font-bold text-base">$80</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slider tugmasi va battafsil -->
    <div class="flex flex-col items-center mt-10 space-y-4">
      <div class="flex gap-2">
        <span class="w-3 h-3 rounded-full bg-[#7dba28]"></span>
        <span class="w-3 h-3 rounded-full bg-gray-300"></span>
        <span class="w-3 h-3 rounded-full bg-gray-300"></span>
      </div>
        <button class="flex items-center gap-2 px-4 py-2 border border-[#7dba28] text-[#7dba28] rounded-full text-sm font-medium">
            Ba’tafsil
            <span class="bg-[#7dba28] text-white rounded-full p-1">
                <svg class="w-4 h-4 transform -rotate-45" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </span>
        </button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'Courses'
}
</script>
