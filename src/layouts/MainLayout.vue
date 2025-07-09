<template>
  <div>
    <Navbar />
    <Banner />
    <!-- <main class="p-6"></main> -->
    <About />
    <Courses />
    <Mentors />
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Banner from '../components/Banner.vue';
import About from '../components/About.vue';
import Courses from '../components/Courses.vue';
import Mentors from '../components/Mentors.vue';

export default {
  components: { Navbar, Footer, Banner, About, Courses, Mentors}
}
</script>
