<template>
  <section class="p-8 rounded-3xl shadow-lg flex flex-col lg:flex-row gap-8 items-center my-20">
    <!-- Chap qism: rasm va text -->
    <div class="flex-1 text-center lg:text-left">
      <img src="../assets/images/today-park.png" alt="IT Park" class="mx-auto lg:mx-0 mb-6 w-auto h-auto rounded-xl" />
    </div>

    <!-- O'ng qism: matn va dasturlar -->
    <div class="flex-1 space-y-6">
      <h3 class="text-3xl font-bold text-[#7dba28]">IT PARK <span class="text-gray-900">NIMA</span></h3>
      <p class="text-gray-900 leading-relaxed">
        IT Park — bu O‘zbekistonda axborot texnologiyalari sohasini rivojlantirishga qaratilgan kompleks va erkin iqtisodiy zona.
        U IT kompaniyalarini qo‘llab-quvvatlash, startap loyihalarni rag‘batlantirish va innovatsiyalarni joriy etish uchun mo‘ljallangan.
      </p>

      <!-- Dasturlar -->
      <div class="space-y-8">
        <!-- Rezidentlik -->
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-full">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-00">Rezidentlik dasturi</h4>
            <p class="text-gray-900 leading-relaxed">
              IT Park rezidenti bo‘lish uchun ariza topshirgan IT kompaniyalari uchun bir qator imtiyozlar va qulayliklar yaratiladi.
            </p>
          </div>
        </div>

        <!-- Ta'lim -->
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-purple-100 flex items-center justify-center rounded-full">
            <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L2 6l8 4 8-4-8-4zm0 6.7L3 5.11V11a1 1 0 001 1h12a1 1 0 001-1V5.11L10 8.7z"/></svg>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-900">Ta’lim dasturlari</h4>
            <p class="text-gray-900 leading-relaxed">
              IT sohasida bilim va ko‘nikmalarni oshirish uchun turli o‘quv kurslari va treninglar.
            </p>
          </div>
        </div>

        <!-- Startuplar -->
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 bg-red-100 flex items-center justify-center rounded-full">
            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11h16v2H2v-2zm0-4h16v2H2V7zm0-4h16v2H2V3z"/></svg>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-900">Startuplar</h4>
            <p class="text-gray-900 leading-relaxed">
              Yangi startap loyihalarni rivojlantirish uchun mo‘ljallangan dasturlar.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>
