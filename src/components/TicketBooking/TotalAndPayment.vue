<template>
  <div class="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
    <div class="flex justify-between items-center text-base font-semibold text-gray-800">
      <span>Tổng cộng:</span>
      <span class="text-blue-600 text-lg">{{ formatPrice(total) }}</span>
    </div>

    <button
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
      @click="$emit('pay')"
    >
      Thanh toán
    </button>
  </div>
</template>

<script setup>
defineProps({ total: Number })
defineEmits(['pay'])

function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ'
}
</script>
