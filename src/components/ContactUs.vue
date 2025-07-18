<template>
  <section id="contact" class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-10">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
          Biz bilan bog'laning
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Savollaringiz bormi? Biz sizga yordam berishga tayyormiz.
          Pastdagi forma orqali murojaat qiling yoki to'g'ridan-to'g'ri qo'ng'iroq qiling.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Contact Info -->
        <div class="lg:col-span-1 space-y-6">
          <div v-for="(info, index) in contactInfo" :key="index" class="flex items-start gap-4 p-6 bg-gray-50 rounded-lg shadow">
            <div :class="['p-3 rounded-full bg-gray-100', info.color]">
              <component :is="info.icon" class="w-5 h-5" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">{{ info.title }}</h4>
              <p v-for="(line, idx) in info.details" :key="idx" class="text-sm text-gray-600">{{ line }}</p>
            </div>
          </div>

          <!-- Map -->
          <div class="p-4 bg-gray-100 rounded-lg shadow">
            <iframe
              class="w-full h-48 rounded"
              src="https://yandex.uz/map-widget/v1/?ll=60.622097%2C41.558524&z=16&l=map"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="p-8 bg-white rounded-2xl shadow-lg">
            <h3 class="text-xl font-semibold text-[#1F2937] mb-6">Biz bilan bog'lanish</h3>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block mb-1 font-medium" for="name">Ism-familiya *</label>
                  <input v-model="form.name" id="name" name="name" type="text" required placeholder="Ismingizni kiriting" class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#7dba28]">
                </div>
                <div>
                  <label class="block mb-1 font-medium" for="phone">Telefon raqami *</label>
                  <input v-model="form.phone" id="phone" name="phone" type="tel" required placeholder="+998 90 123 45 67" class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#7dba28]">
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block mb-1 font-medium" for="email">Email manzili</label>
                  <input v-model="form.email" id="email" name="email" type="email" placeholder="email@example.com" class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#7dba28]">
                </div>
                <div>
                  <label class="block mb-1 font-medium" for="course">Qiziqtirgan kurs</label>
                  <select v-model="form.course" id="course" name="course" class="w-full px-4 py-3 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7dba28]">
                    <option value="">Kursni tanlang</option>
                    <option value="Kompyuter savodxonligi">Kompyuter savodxonligi</option>
                    <option value="Web dasturlash">Web dasturlash</option>
                    <option value="Mobilografiya">Mobilografiya</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block mb-1 font-medium" for="message">Xabar</label>
                <textarea v-model="form.message" id="message" name="message" rows="4" placeholder="Sizning xabaringiz..." class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#7dba28]"></textarea>
              </div>

              <button type="submit" class="w-full bg-[#7dba28] text-white font-semibold py-3 rounded hover:bg-[#6aa822] transition">
                Xabar yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { Phone, Mail, MapPin, Clock } from 'lucide-vue-next'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  course: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  alert('Arizangiz yuborildi!')
  // Clear form
  form.name = ''
  form.phone = ''
  form.email = ''
  form.course = ''
  form.message = ''
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+998 99 053 11 99', '+998 93 150 11 99'],
    color: 'text-green-600'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@itacademy.uz', 'support@itacademy.uz'],
    color: 'text-blue-600'
  },
  {
    icon: MapPin,
    title: 'Manzil',
    details: ['Xorazm viloyati, Urganch shahri', 'Tinchlik ko‘chasi, 6-uy'],
    color: 'text-red-600'
  },
  {
    icon: Clock,
    title: 'Ish vaqti',
    details: ['Dush-Jum: 09:00-20:00', 'Shanba: 09:00-17:00'],
    color: 'text-orange-600'
  }
]
</script>

<style scoped>
/* Optional: custom styling if needed */
</style>
