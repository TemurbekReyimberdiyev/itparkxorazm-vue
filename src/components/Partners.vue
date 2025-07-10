<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4 text-center">

      <!-- Sarlavha -->
      <h2 class="text-3xl font-bold text-[#7dba28] mb-8">Hamkorlarimiz</h2>

      <!-- Hamkor logotiplari -->
      <div class="flex flex-wrap justify-center items-center gap-20">
        <div v-for="(partner, index) in partners" :key="index">
          <img :src="partner.logo" :alt="partner.name" class="h-20 object-contain mx-auto">
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Partners',
  data() {
    return {
      partners: [
        { name: 'Hamkor 1', logo: '/images/partner1.png' },
        { name: 'Hamkor 2', logo: '/images/partner2.png' },
        { name: 'IT Park', logo: '/images/partner3.png' },
        { name: 'Hamkor 4', logo: '/images/partner4.png' },
      ],
    }
  },
}
</script>
