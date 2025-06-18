<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-green-50">
    <h1 class="text-3xl font-bold text-green-600">🎉 Thanh toán thành công!</h1>
    <p class="mt-4">Cảm ơn bạn đã đặt vé. Mã hóa đơn: <strong>{{ invoiceId }}</strong></p>
    <RouterLink to="/" class="mt-6 text-blue-600 underline">Về trang chủ</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const invoiceId = ref(route.query.invoice_id)
</script>
