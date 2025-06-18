<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-red-50">
    <h1 class="text-3xl font-bold text-red-600">❌ Thanh toán thất bại!</h1>
    <p class="mt-4">Lý do: {{ reason || 'Không xác định' }}</p>
    <RouterLink to="/" class="mt-6 text-blue-600 underline">Thử lại hoặc về trang chủ</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const reason = ref(route.query.reason)
</script>
