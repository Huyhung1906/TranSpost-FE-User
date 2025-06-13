<template>
  <div class="flex justify-center gap-10 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 border-t border-blue-400 text-lg text-white font-semibold">
    <div class="container mx-auto flex justify-center items-center gap-6 relative">
      <!-- Nút quay lại -->
      <button
        @click="goBack"
        class="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-white hover:underline px-4"
      >
        <span class="text-lg">←</span>
        <span class="ml-1 text-sm">Quay lại</span>
      </button>

      <!-- Tiêu đề và thời gian -->
      <div class="text-center">
        <h1 class="text-2xl font-semibold">
          {{ trip.route.departure_point }} - {{ trip.route.destination_point }}
        </h1>
        <p class="text-sm">
          Thời gian: {{ formatUTCDateTime(trip.departure_time) }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'

defineProps({ trip: Object })
const router = useRouter()

function goBack() {
  router.back()
}

// Hàm format thời gian UTC
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
