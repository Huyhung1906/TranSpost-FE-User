<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      🧾 Lịch sử thanh toán
    </h2>

    <div
      v-if="invoices.length"
      class="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
    >
      <div
        v-for="invoice in invoices"
        :key="invoice.id"
        class="border rounded-xl p-6 shadow hover:shadow-lg transition bg-white"
      >
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h3 class="text-xl font-semibold text-blue-700">Hóa đơn #{{ invoice.id }}</h3>
            <p class="text-sm text-gray-500">Ngày tạo: {{ formatDateTime(invoice.created_at) }}</p>
          </div>
          <button
            class="text-sm text-blue-600 hover:underline mt-2 md:mt-0"
            @click="toggleDetails(invoice.id)"
          >
            {{ expandedInvoices.includes(invoice.id) ? '▲ Ẩn chi tiết' : '▼ Xem chi tiết' }}
          </button>
        </div>

        <!-- Invoice Info -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div><span class="font-medium">💰 Số tiền:</span> {{ formatCurrency(invoice.total_amount) }}</div>
          <div><span class="font-medium">🧾 Trạng thái:</span>
            <span
              :class="{
                'text-green-600 font-semibold': invoice.status === 'paid',
                'text-yellow-600 font-semibold': invoice.status === 'pending',
                'text-red-600 font-semibold': invoice.status === 'failed'
              }"
            >
              {{ formatStatus(invoice.status) }}
            </span>
          </div>
          <div><span class="font-medium">💳 Phương thức:</span> {{ invoice.payment_method.toUpperCase() }}</div>
        </div>

        <!-- Ticket Details -->
        <div v-if="expandedInvoices.includes(invoice.id)" class="mt-6 border-t pt-4">
          <h4 class="text-base font-semibold mb-3 text-gray-700">🎟️ Danh sách vé:</h4>
          <div
            v-for="ticket in invoice.tickets"
            :key="ticket.id"
            class="p-4 rounded-lg bg-gray-50 border mb-3"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-800">
              <div><strong>Chuyến:</strong> {{ ticket.trip.route.departure_point }} → {{ ticket.trip.route.destination_point }}</div>
              <div><strong>Thời gian:</strong> {{ formatDateTime(ticket.trip.departure_time) }}</div>
              <div><strong>Ghế:</strong> {{ ticket.seat_number }}</div>
              <div><strong>Người đi:</strong> {{ ticket.passenger_name }}</div>
              <div><strong>SĐT:</strong> {{ ticket.passenger_phone }}</div>
              <div><strong>Email:</strong> {{ ticket.passenger_email }}</div>
              <div><strong>Loại xe:</strong> {{ ticket.trip.vehicle.name }} ({{ ticket.trip.vehicle.type }})</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center mt-10 text-lg">Không tìm thấy hóa đơn nào.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserInvoices } from '@/services/invoiceService'

const invoices = ref<any[]>([])
const expandedInvoices = ref<number[]>([])

const toggleDetails = (id: number) => {
  if (expandedInvoices.value.includes(id)) {
    expandedInvoices.value = expandedInvoices.value.filter(i => i !== id)
  } else {
    expandedInvoices.value.push(id)
  }
}

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

const formatStatus = (status: string) => {
  if (status === 'paid') return 'Đã thanh toán'
  if (status === 'pending') return 'Chờ thanh toán'
  if (status === 'failed') return 'Thất bại'
  return status
}

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (!token) return

  try {
    invoices.value = await getUserInvoices(token)
  } catch (err) {
    console.error('Không thể tải danh sách hóa đơn:', err)
  }
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #f3f4f6;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 4px;
}
button {
  transition: all 0.2s ease-in-out;
}
</style>
