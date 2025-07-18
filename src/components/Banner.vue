<template>
  <section id="banner" class="pt-20 md:pt-10 lg:pt-0 pb-5">
    <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

      <!-- Chap qism: matn va tugma -->
      <div>
        <h1 class="text-4xl text-gray-900 md:text-5xl font-bold mb-6 leading-tight">
          IT Park Xorazm — <br />
          kelajak IT liderlari maskani!
        </h1>
        <p class="text-lg text-gray-900 mb-8">
          Dasturlash, dizayn va IT kurslari Xorazmda. Zamonaviy markaz, tajribali mentorlar,
          amaliy darslar. IT Park Xorazm bilan kelajagingizni bugun boshlang!
        </p>
        <a
          href="#"
          class="bg-[#7dba28] hover:bg-[#689a23] text-white font-medium px-6 py-3 rounded transition duration-300"
        >
          Kursga yozilish
        </a>
      </div>

      <!-- O'ng qism: bitta rasm -->
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
export default {
  name: 'Banner'
}
</script>
