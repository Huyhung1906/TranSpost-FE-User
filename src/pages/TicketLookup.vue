<!-- src/pages/TicketLookup.vue -->
<template>
  <div>
    <header class="text-white w-full shadow font-sans">
      <HeaderTop />
      <Navbar />
    </header>

    <div class="container mx-auto py-12 px-4 max-w-4xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">🔍 Tra cứu vé / hóa đơn</h1>
      <p class="text-gray-600 mb-6">Nhập mã vé hoặc mã hóa đơn để xem thông tin chi tiết.</p>

      <div class="flex gap-4 items-center mb-8">
        <input
          v-model="searchCode"
          @keyup.enter="lookupInvoice"
          type="text"
          placeholder="Nhập mã vé hoặc mã hóa đơn..."
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="lookupInvoice"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Tra cứu
        </button>
      </div>

      <div v-if="loading" class="text-blue-500">Đang tra cứu...</div>
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <div v-if="results.length" class="space-y-6">
        <div
          v-for="invoice in results"
          :key="invoice.id"
          class="bg-white border shadow rounded-lg p-6"
        >
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-xl font-semibold text-blue-700">🧾 Hóa đơn #{{ invoice.id }}</h2>
              <p class="text-sm text-gray-500">Ngày tạo: {{ formatDateTime(invoice.created_at) }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700 mb-4">
            <div><strong>💰 Số tiền:</strong> {{ formatCurrency(invoice.total_amount) }}</div>
            <div><strong>💳 Phương thức:</strong> {{ invoice.payment_method.toUpperCase() }}</div>
            <div><strong>📌 Trạng thái:</strong>
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
          </div>

          <div>
            <h3 class="text-base font-semibold mb-2 text-gray-700">🎟️ Danh sách vé:</h3>
            <div
              v-for="ticket in invoice.tickets"
              :key="ticket.id"
              class="bg-gray-50 border rounded-lg p-4 mb-3 text-sm"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div><strong>Chuyến:</strong> {{ ticket.trip.route.departure_point }} → {{ ticket.trip.route.destination_point }}</div>
                <div><strong>Thời gian:</strong> {{ formatDateTime(ticket.trip.departure_time) }}</div>
                <div><strong>Ghế:</strong> {{ ticket.seat_number }}</div>
                <div><strong>Hành khách:</strong> {{ ticket.passenger_name }}</div>
                <div><strong>SĐT:</strong> {{ ticket.passenger_phone }}</div>
                <div><strong>Email:</strong> {{ ticket.passenger_email }}</div>
                <div><strong>Loại xe:</strong> {{ ticket.trip.vehicle.name }} ({{ ticket.trip.vehicle.type }})</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!loading && !error" class="text-gray-500 text-sm">Không có kết quả.</div>
    </div>

    <Info />
    <Footer />
    <ChatWidget />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import HeaderTop from '@/components/HeaderTop.vue'
import Navbar from '@/components/Navbar.vue'
import Info from '@/components/Info.vue'
import Footer from '@/components/Footer.vue'
import ChatWidget from '@/components/ChatWidget.vue'

const searchCode = ref('')
const results = ref([])
const error = ref('')
const loading = ref(false)

const formatDateTime = (datetime) => {
  return new Date(datetime).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND'
  }).format(Number(amount))
}

const formatStatus = (status) => {
  if (status === 'paid') return 'Đã thanh toán'
  if (status === 'pending') return 'Chờ thanh toán'
  return 'Thất bại'
}

const lookupInvoice = async () => {
  error.value = ''
  results.value = []
  if (!searchCode.value.trim()) {
    error.value = 'Vui lòng nhập mã vé hoặc hóa đơn.'
    return
  }

  loading.value = true
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/invoice/lookup/`, {
      params: { code: searchCode.value.trim() }
    })

    if (res.data.success) {
      results.value = res.data.data
    } else {
      error.value = res.data.message || 'Không tìm thấy kết quả.'
    }
  } catch (err) {
    error.value = 'Lỗi kết nối đến máy chủ.'
  } finally {
    loading.value = false
  }
}
</script>
