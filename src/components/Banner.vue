<template>
  <section id="banner" class="max-w-7xl mx-auto px-6 pt-20 md:pt-10 lg:pt-0 pb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <!-- Chap qism: matn va tugma -->
      <div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          IT Park Xorazm — <br />
          kelajak IT liderlari maskani!
        </h1>
        <p class="text-lg text-gray-800 mb-8">
          Dasturlash, dizayn va IT kurslari Xorazmda. Zamonaviy markaz, tajribali mentorlar,
          amaliy darslar. IT Park Xorazm bilan kelajagingizni bugun boshlang!
        </p>
        <a
          href="#contact"
          class="bg-[#7dba28] hover:bg-[#689a23] text-white font-medium px-6 py-3 rounded transition duration-300 inline-block"
        >
          Kursga yozilish
        </a>

        <!-- Statistika cardlari -->
        <div
          class="mt-10 grid grid-cols-3 gap-4 max-[360px]:grid-cols-1 sm:grid-cols-3"
        >
          <div class="bg-white rounded-xl shadow text-center p-4">
            <Users class="mx-auto text-[#7dba28]" size="32" />
            <h3 class="mt-2 text-lg font-semibold text-gray-900">1500+</h3>
            <p class="text-sm text-gray-600">Bitiruvchilar</p>
          </div>
          <div class="bg-white rounded-xl shadow text-center p-4">
            <BookOpen class="mx-auto text-[#7dba28]" size="32" />
            <h3 class="mt-2 text-lg font-semibold text-gray-900">15+</h3>
            <p class="text-sm text-gray-600">Kurslar</p>
          </div>
          <div class="bg-white rounded-xl shadow text-center p-4">
            <Briefcase class="mx-auto text-[#7dba28]" size="32" />
            <h3 class="mt-2 text-lg font-semibold text-gray-900">90%</h3>
            <p class="text-sm text-gray-600">Ishga joylashish</p>
          </div>
        </div>
      </div>

      <!-- O‘ng qism: rasm -->
      <div>
        <img
          src="../assets/images/itparkxorazm.jpeg"
          alt="IT Park Xorazm"
          class="rounded-xl shadow w-full h-auto object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { Users, BookOpen, Briefcase } from 'lucide-vue-next'

export default {
  name: 'Banner',
  components: {
    Users,
    BookOpen,
    Briefcase
  }
}
</script>
