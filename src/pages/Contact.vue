
// src/pages/Contact.vue
<template>
  <div>
    <header class="text-white w-full shadow font-sans">
    <HeaderTop />
    <Navbar />
  </header>
    <div class="container mx-auto py-10">
      <h1 class="text-3xl font-bold mb-6">Contact</h1>
      <p>Get in touch with us.</p>
    </div>
    <Info />
    <Footer />
  </div>
</template>

<script setup>
import HeaderTop from '@/components/HeaderTop.vue'
import Navbar from '@/components/Navbar.vue'
import Info from '@/components/Info.vue'
import Footer from '@/components/Footer.vue'
</script>