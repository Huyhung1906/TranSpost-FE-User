<template>
  <div class="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-center py-4">
    <h1 class="text-2xl font-semibold text-white">
      {{ trip.route.departure_point }} - {{ trip.route.destination_point }}
    </h1>
    <p class="text-sm text-white">
      Thời gian: {{ formatUTCDateTime(trip.departure_time)}}
    </p>
  </div>
</template>

<script setup>
defineProps({ trip: Object })
// Hàm format sang dạng "11/06/2025 20:00"
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
