<!-- components/Navbar.vue -->
<template>
  <nav class="flex justify-center gap-10 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 border-t border-blue-400 text-lg text-white font-semibold">
    <RouterLink
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.path"
      class="relative pb-1 hover:underline transition"
      :class="{ 'border-b-2 border-white': isActive(item.path) }"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const menuItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Lịch trình', path: '/schedule' },
  { label: 'Tra cứu vé', path: '/ticket-lookup' },
  { label: 'Tin tức', path: '/news' },
  { label: 'Hóa đơn', path: '/invoice' },
  { label: 'Liên hệ', path: '/contact' },
]

const isActive = (path: string) => route.path === path
</script>
