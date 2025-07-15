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
import digitalLogo from '../assets/images/digital.png'
import raqamliLogo from '../assets/images/raqamli.png'
import itparkLogo from '../assets/images/itpark.png'
import tatuLogo from '../assets/images/tatu.png'

export default {
  name: 'Partners',
  data() {
    return {
      partners: [
        { name: 'Digital', logo: digitalLogo },
        { name: 'Raqamli', logo: raqamliLogo },
        { name: 'IT Park', logo: itparkLogo },
        { name: 'TATU', logo: tatuLogo },
      ],
    }
  },
}
</script>
