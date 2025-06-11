<template>
  <div class="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">💰 Chi tiết giá</h3>

    <div class="space-y-2 text-sm text-gray-700">
      <div class="flex justify-between">
        <span class="text-gray-500">Giá vé ({{ selectedSeats.length }} ghế):</span>
        <span class="font-medium">{{ selectedSeats.length * trip.price }}đ</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-500">Phí thanh toán:</span>
        <span class="font-medium">0đ</span>
      </div>
    </div>

    <div class="border-t pt-4 text-base flex justify-between font-semibold text-gray-800">
      <span>Tổng tiền:</span>
      <span class="text-blue-600">{{formatPrice(selectedSeats.length * trip.price) }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  trip: Object,
  selectedSeats: Array
})
function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ'
}
</script>
