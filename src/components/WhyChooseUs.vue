<template>
  <section class="py-16 lg:py-24 bg-gray-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <span class="inline-flex items-center rounded-full border border-primary text-primary px-4 py-1 text-sm font-medium mb-4">
          Bizning ustunliklarimiz
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nima uchun bizni tanlaydilar?
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Bizning o'quv markazimizni tanlashingiz uchun juda ko'p sabablar mavjud. 
          Mana ba'zi muhim ustunliklarimiz:
        </p>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="rounded-xl bg-white text-center p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="text-3xl md:text-4xl font-bold text-[#7dba28] mb-2">
            {{ stat.number }}
          </div>
          <div class="text-sm text-gray-600">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Benefits Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
        >
          <div
            :class="`p-3 rounded-full bg-gray-100 inline-flex justify-center items-center mb-4 transition-transform group-hover:scale-110 ${benefit.color}`"
          >
            <component :is="benefit.icon" class="w-8 h-8" />
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ benefit.title }}</h3>
          <p class="text-sm text-gray-600">{{ benefit.description }}</p>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16">
        <div class="bg-[#7dba28] rounded-2xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">Hoziroq boshlang!</h3>
          <p class="text-lg mb-6 text-white/90">
            Bepul konsultatsiya va demo darslarga yoziling
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="px-8 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Bepul konsultatsiya
            </button>
            <button
              class="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Demo darsi
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import {
  GraduationCap,
  Briefcase,
  Clock,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  Shield
} from 'lucide-vue-next'

const benefits = [
  {
    icon: GraduationCap,
    title: "Sifatli ta'lim",
    description:
      "Zamonaviy o'qitish metodlari va eng so'nggi texnologiyalar asosida",
    color: 'text-blue-600'
  },
  {
    icon: Briefcase,
    title: 'Kafolatlangan ishga joylashish',
    description:
      '90% bitiruvchilar kurs tugagach 3 oy ichida ishga joylashadi',
    color: 'text-green-600'
  },
  {
    icon: Clock,
    title: 'Moslashuvchan jadval',
    description: 'Haftada 3 kun, kunlik va kechki guruhlar mavjud',
    color: 'text-orange-600'
  },
  {
    icon: CheckCircle,
    title: 'Amaliy loyihalar',
    description: 'Har bir kurs oxirida real loyihalar ustida ishlash',
    color: 'text-purple-600'
  },
  {
    icon: Users,
    title: 'Kichik guruhlar',
    description: 'Har bir guruhda maksimal 15 ta talaba, individual yondashuv',
    color: 'text-red-600'
  },
  {
    icon: Award,
    title: 'Rasmiy sertifikat',
    description: 'Davlat tomonidan tan olingan sertifikat berish',
    color: 'text-yellow-600'
  },
  {
    icon: TrendingUp,
    title: 'Karyera rivojlanishi',
    description: "Ishga joylashgandan keyin ham doimiy qo'llab-quvvatlash",
    color: 'text-indigo-600'
  },
  {
    icon: Shield,
    title: 'Ishonchlilik',
    description: '3 yillik tajriba va ming dan ortiq mamnun talabalar',
    color: 'text-cyan-600'
  }
]

const stats = [
  { number: '1500+', label: 'Muvaffaqiyatli bitiruvchilar' },
  { number: '90%', label: 'Ishga joylashish koeffitsienti' },
  { number: '20+', label: 'Hamkor kompaniyalar' },
  { number: '3', label: 'Yillik tajriba' }
]
</script>
