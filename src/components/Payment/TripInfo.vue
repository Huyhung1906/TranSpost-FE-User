<template>
  <div v-if="booking" class="bg-white p-4 rounded shadow mb-4">
    <h3 class="font-semibold text-lg mb-2">Thông tin chuyến đi</h3>
    <p><strong>Tuyến:</strong> {{ booking.trip.route.departure_point }} → {{ booking.trip.route.destination_point }}</p>
    <p><strong>Thời gian khởi hành:</strong> {{ formatDateTime(booking.trip.departure_time) }}</p>
    <p><strong>Xe:</strong> {{ booking.trip.vehicle.name }} ({{ booking.trip.vehicle.licenseplate }})</p>
    <p><strong>Điểm đón:</strong> {{ booking.pickup_point.pickup }}</p> <!-- ✅ Thêm dòng này -->
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  booking: any
}>()

function formatDateTime(datetime: string) {
  const date = new Date(datetime)
  return date.toLocaleString('vi-VN', { hour12: false })
}
</script>
