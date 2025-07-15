<template>
  <div>
    <Navbar />
    <Banner />
    <About />
    <Courses />
    <Mentors />
    <News />
    <ContactUs />
    <Partners />
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
import News from '../components/News.vue';
import Partners from '../components/Partners.vue';
import ContactUs from '../components/ContactUs.vue';

export default {
  components: { Navbar, Footer, Banner, About, Courses, Mentors, News, Partners, ContactUs}
}
</script>