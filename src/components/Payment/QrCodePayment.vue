<template>
  <div class="bg-white p-6 rounded-xl shadow-md text-center space-y-4">
    <!-- Tổng thanh toán -->
    <div>
      <p class="text-gray-500 text-sm">Tổng thanh toán</p>
      <p class="text-3xl font-bold text-red-500">410.000đ</p>
    </div>

    <!-- Thời gian giữ chỗ -->
    <div class="bg-gray-100 rounded-lg py-2 text-sm text-orange-500 font-medium">
      Thời gian giữ chỗ còn lại {{ formattedTime }}
    </div>

    <!-- QR Code -->
    <div>
      <img src="@/assets/icon/qr-code-demo.png" alt="QR Code" class="w-48 h-48 mx-auto rounded-md" />
    </div>

    <!-- Hướng dẫn thanh toán -->
    <div class="text-left space-y-2">
      <p class="text-sm font-semibold text-green-600">Hướng dẫn thanh toán bằng FUTAPay</p>
      <ul class="text-sm text-gray-600 space-y-1">
        <li><span class="font-bold text-gray-700">1.</span> Mở ứng dụng FUTAPay trên điện thoại</li>
        <li><span class="font-bold text-gray-700">2.</span> Dùng biểu tượng <span class="inline-block bg-gray-200 px-1 rounded">📷</span> để quét mã QR</li>
        <li><span class="font-bold text-gray-700">3.</span> Quét mã ở trang này và thanh toán</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Tổng thời gian giữ chỗ (giây) — 20 phút = 1200 giây
const totalTime = 20 * 60
const remaining = ref(totalTime)
let timer = null

const formattedTime = computed(() => {
  const minutes = Math.floor(remaining.value / 60).toString().padStart(2, '0')
  const seconds = (remaining.value % 60).toString().padStart(2, '0')
  return `${minutes} : ${seconds}`
})

onMounted(() => {
  timer = setInterval(() => {
    if (remaining.value > 0) {
      remaining.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
