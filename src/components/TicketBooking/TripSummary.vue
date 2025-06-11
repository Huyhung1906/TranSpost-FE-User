<template>
  <div class="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">🚌 Thông tin lượt đi</h3>

    <div class="space-y-2 text-sm text-gray-700">
      <div class="flex justify-between">
        <span class="text-gray-500">Tuyến xe:</span>
        <span class="font-medium">{{ trip.route.departure_point }} → {{ trip.route.destination_point}}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-500">Thời gian xuất bến:</span>
        <span class="font-medium">{{ formatUTCDateTime(trip.departure_time) }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-gray-500">Số lượng ghế:</span>
        <span class="font-medium">{{ selectedSeats.length }}</span>
      </div>

      <div class="flex justify-between">
  <span class="text-gray-500">Số ghế đã chọn:</span>
  <span class="font-medium">
    {{ selectedSeats.length ? selectedSeats.map(s => s.id).join(', ') : 'Chưa chọn' }}
  </span>
</div>

    </div>

    <div class="border-t pt-4 text-base flex justify-between font-semibold text-gray-800">
      <span>Tổng tiền lượt đi:</span>
      <span class="text-blue-600">{{ formatPrice(selectedSeats.length * trip.price) }}</span>
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
function formatUTCDateTime(isoString) {
  const date = new Date(isoString)

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

</script>
