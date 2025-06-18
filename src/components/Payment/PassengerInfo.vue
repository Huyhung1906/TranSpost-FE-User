<template>
  <div class="bg-white p-4 rounded shadow mb-4">
    <h3 class="font-semibold text-lg mb-2">Thông tin hành khách</h3>

    <div v-if="passenger">
      <p><strong>Họ và tên:</strong> {{ passenger.passenger_name }}</p>
      <p><strong>Số điện thoại:</strong> {{ passenger.passenger_phone }}</p>
      <p><strong>Email:</strong> {{ passenger.passenger_email }}</p>
    </div>
    <div v-else>
      <p>Không có thông tin hành khách.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  booking: {
    type: Object,
    required: true
  }
})

// Lấy thông tin hành khách từ vé đầu tiên
const passenger = computed(() => {
  return props.booking?.tickets?.[0] || null
})
</script>
