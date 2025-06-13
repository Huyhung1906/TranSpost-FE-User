<template>
  <div class="flex justify-center gap-10 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 border-t border-blue-400 text-lg text-white font-semibold">
    <div class="container mx-auto flex items-center justify-center relative">
      <!-- Nút quay lại -->
      <button
        class="absolute left-0 text-white hover:underline"
        @click="$router.back()"
      >
        ← Quay lại
      </button>

      <!-- Nội dung căn giữa -->
      <div class="text-center">
        <h1 class="text-2xl font-semibold">TP. Hồ Chí Minh - Đà Lạt</h1>
        <p class="text-sm mt-1">{{ now }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
dayjs.locale('vi')

const now = dayjs().format('dddd, DD/MM/YYYY')
</script>
