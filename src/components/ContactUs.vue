<template>
  <section id="contact" class="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-8">
    <!-- Form -->
    <div class="flex-1">
      <h2 class="text-2xl font-semibold text-[#7dba28] mb-6 border-b border-[#7dba28] inline-block pb-1">BOG‘LANISH</h2>
      <p class="text-gray-800 mb-4 font-medium">Kursga yozilish</p>

      <form @submit.prevent="submitForm" class="space-y-4">
        <input
          v-model="form.fullname"
          type="text"
          placeholder="ISM FAMILYA"
          class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#7dba28]"
          required
        />
        <input
          v-model="form.phone"
          type="tel"
          placeholder="+998"
          class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#7dba28]"
          required
        />
        <input
          v-model="form.username"
          type="text"
          placeholder="@username"
          class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#7dba28]"
        />
        <select
          v-model="form.course"
          class="w-full border border-gray-300 p-3 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7dba28]"
        >
          <option value="">Kursni tanlang</option>
          <option value="Kompyuter savodxonligi">Kompyuter savodxonligi</option>
          <option value="Web dasturlash">Web dasturlash</option>
          <option value="Mobilografiya">Mobilografiya</option>
        </select>

        <button
          type="submit"
          class="w-full bg-[#7dba28] text-white font-semibold py-3 rounded hover:bg-[#6aa822] transition"
        >
          Yuborish
        </button>
      </form>
    </div>

    <!-- Contact Info -->
    <div class="flex-1 space-y-4">
      <p class="text-gray-700">Xorazm viloyati, Urganch shahri <br />Tinchlik ko‘chasi 6-uy</p>

      <div class="space-y-1">
        <p class="text-gray-800 font-medium">+998 99 053 11 99</p>
        <p class="text-gray-800 font-medium">+998 93 150 11 99</p>
      </div>

      <p class="text-gray-700 font-medium">IT Park Xorazm</p>

      <!-- Social Links -->
      <div class="flex items-center space-x-4">
        <a href="#" target="_blank"><i class="fa-brands fa-youtube text-2xl text-gray-600 hover:text-[#7dba28]"></i></a>
        <a href="#" target="_blank"><i class="fa-brands fa-instagram text-2xl text-gray-600 hover:text-[#7dba28]"></i></a>
        <a href="#" target="_blank"><i class="fa-brands fa-facebook text-2xl text-gray-600 hover:text-[#7dba28]"></i></a>
      </div>

      <!-- Google Map -->
      <iframe
        class="w-full h-48 rounded"
        src="https://yandex.uz/map-widget/v1/?ll=60.622097%2C41.558524&z=16&l=map"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  fullname: '',
  phone: '',
  username: '',
  course: ''
})

const submitForm = () => {
  console.log('Form maʼlumotlari:', form)
  alert('Arizangiz yuborildi!')
}
</script>

<style scoped>
/* Font Awesome CDN kerak bo‘ladi */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
