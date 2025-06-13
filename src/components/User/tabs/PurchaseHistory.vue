<template>
  <div class="p-6 bg-white shadow rounded-lg">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">🧾 Lịch sử mua vé</h2>

    <div v-if="tickets.length" class="space-y-4">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="border rounded-lg p-4 hover:shadow transition bg-gray-50"
      >
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-blue-700">
            {{ ticket.trip.route.departure_point }} → {{ ticket.trip.route.destination_point }}
          </h3>
          <span class="text-sm text-gray-500">Mã chuyến: #{{ ticket.trip.id }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <div><strong>Thời gian đi:</strong> {{ formatDateTime(ticket.trip.departure_time) }}</div>
          <div><strong>Thời gian đến:</strong> {{ formatDateTime(ticket.trip.arrival_time) }}</div>
          <div><strong>Số ghế:</strong> {{ ticket.seat_number }}</div>
          <div><strong>Loại xe:</strong> {{ ticket.trip.vehicle.name }} ({{ ticket.trip.vehicle.type }})</div>
          <div><strong>Tài xế:</strong> {{ ticket.trip.driver.fullname }} - {{ ticket.trip.driver.phone }}</div>
          <div><strong>Trạng thái:</strong>
            <span :class="ticket.status === 'available' ? 'text-green-600' : 'text-red-600'">
              {{ ticket.status }}
            </span>
          </div>
          <div><strong>Giá vé:</strong> {{ formatCurrency(ticket.trip.price) }}</div>
          <div><strong>Người đi:</strong> {{ ticket.user?.fullname || 'Chưa có' }} - {{ ticket.user?.email }}</div>
          <div><strong>SĐT:</strong> {{ ticket.passenger_phone }}</div>
          <div><strong>Email hành khách:</strong> {{ ticket.passenger_email }}</div>
          <div><strong>Invoice:</strong> {{ ticket.invoice?.code || 'Không có' }}</div>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500">Không có vé nào được tìm thấy.</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

const tickets = ref([])

const formatDateTime = (datetime: string) => {
  const date = new Date(datetime)
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(typeof amount === 'string' ? parseFloat(amount) : amount)
}

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    console.warn('⚠ Không có token đăng nhập!')
    return
  }

  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/my-tickets/`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    console.log('📦 Dữ liệu từ API:', res.data)

    const list = res.data.data?.data
    if (Array.isArray(list)) {
      tickets.value = list
      console.log(`✅ Đã lấy được ${list.length} vé`)
    } else {
      console.error('❗ Trường data.data không phải mảng:', list)
    }
  } catch (error) {
    console.error('❌ Lỗi khi gọi API lấy vé:', error)
  }
})

</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
