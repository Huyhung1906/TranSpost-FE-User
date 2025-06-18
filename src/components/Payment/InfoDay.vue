<template>
  <div class="flex justify-center gap-10 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 border-t border-blue-400 text-lg text-white font-semibold">
    <div class="container mx-auto flex items-center justify-center relative">
      <!-- Nút quay lại -->
      <button class="absolute left-0 text-white hover:underline" @click="$emit('back-clicked')">
        ← Quay lại
      </button>

      <!-- Nội dung tuyến và thời gian -->
      <div class="text-center">
        <h1 class="text-2xl font-semibold">
          {{ routeText }}
        </h1>
        <p class="text-sm mt-1">{{ formattedDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
dayjs.locale('vi')

const props = defineProps({
  booking: {
    type: Object,
    required: true
  }
})

defineEmits(['back-clicked'])

// Tên tuyến đường động
const routeText = computed(() => {
  const route = props.booking?.trip?.route
  if (route?.departure_point && route?.destination_point) {
    return `${route.departure_point} - ${route.destination_point}`
  }
  return 'Tuyến không xác định'
})

// Ngày đi được format
const formattedDate = computed(() => {
  const time = props.booking?.trip?.departure_time
  return time ? dayjs(time).format('dddd, DD/MM/YYYY') : ''
})
</script>
