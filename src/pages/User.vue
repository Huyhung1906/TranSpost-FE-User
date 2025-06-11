<!-- src/pages/User.vue -->
<template>
   <div class="flex flex-col min-h-screen bg-gray-100">
    <header class="text-white w-full shadow font-sans">
    <HeaderTop />
    <Navbar />
    </header>

    <!-- Nội dung chính -->
    <div class="flex flex-1 max-w-6xl mx-auto w-full p-6 gap-6">
      <!-- Sidebar cố định độ rộng -->
      <div class="w-64 flex-shrink-0">
        <UserSlidebar :activeTab="activeTab" @tab-selected="changeTab" />
      </div>

      <!-- Content chiếm phần còn lại -->
      <div class="flex-1">
        <UserContent :activeTab="activeTab" />
      </div>
    </div>
    <Info />
    <Footer />
    <ChatWidget />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderTop from '@/components/HeaderTop.vue'
import Navbar from '@/components/Navbar.vue'

import Info from '@/components/Info.vue'

import Footer from '@/components/Footer.vue'
import ChatWidget from '@/components/ChatWidget.vue'
import UserSlidebar from '@/components/User/UserSlidebar.vue'
import UserContent from '@/components/User/UserContent.vue'

const activeTab = ref('info')

function changeTab(tab) {
  activeTab.value = tab
}

onMounted(() => {
  const savedTab = localStorage.getItem('user_tab')
  if (savedTab) {
    activeTab.value = savedTab
    localStorage.removeItem('user_tab')
  }
})
</script>
