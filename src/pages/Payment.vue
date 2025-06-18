<template>
  <div class="payment-page">
    <Header />
    <InfoDay :booking="booking" @back-clicked="confirmCancelAndGoBack" />

    <div class="content grid grid-cols-3 gap-4 p-6 max-w-6xl mx-auto px-4">
      <!-- Cột trái: phương thức thanh toán -->
      <div class="col-span-2">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Chọn phương thức thanh toán</h2>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <PaymentMethod />
          <QrCodePayment />
        </div>

        <!-- Nút thanh toán -->
        <div class="mt-6 text-right col-span-2">
          <button @click="handlePayment" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded">
            Thanh toán
          </button>
        </div>
      </div>

      <!-- Cột phải: thông tin vé -->
      <div class="col-span-1 space-y-4">
        <PassengerInfo :booking="booking" v-model:passengers="passengers" />
        <TripInfo :booking="booking" />
        <PriceDetail :booking="booking" />
      </div>
    </div>

    <Info />
    <Footer />
    <ChatWidget />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'

import { releaseTickets } from '@/services/ticketService'
import { createInvoice, getVnpayPaymentUrl } from '@/services/invoiceService'

import Header from '@/components/HeaderTop.vue'
import InfoDay from '@/components/Payment/InfoDay.vue'
import Footer from '@/components/Footer.vue'
import QrCodePayment from '@/components/Payment/QrCodePayment.vue'
import PassengerInfo from '@/components/Payment/PassengerInfo.vue'
import TripInfo from '@/components/Payment/TripInfo.vue'
import PriceDetail from '@/components/Payment/PriceDetail.vue'
import PaymentMethod from '@/components/Payment/PaymentMethod.vue'
import Info from '@/components/Info.vue'
import ChatWidget from '@/components/ChatWidget.vue'

// Interface
interface Ticket {
  id: number
  seat_number: string
  status: string
  pickup_point?: string
  passenger_name?: string
  passenger_phone?: string
  passenger_email?: string
}

interface Booking {
  tickets: Ticket[]
  total_price: number
  user_id: number | string
  created_at: string
  trip: {
    id: number
    route: any
    departure_time: string
    vehicle: any
    price: number
  }
  pickup_point?: {
    pickup: string
  }
}

interface Passenger {
  name: string
  phone: string
  email: string
}

const route = useRoute()
const router = useRouter()
const toast = useToast()
const booking = ref<Booking | null>(null)
const passengers = ref<Passenger[]>([])

onMounted(() => {
  const encodedBooking = route.query.booking as string
  if (encodedBooking) {
    try {
      const decoded = decodeURIComponent(encodedBooking)
      booking.value = JSON.parse(decoded) as Booking
      console.log('📦 Booking:', booking.value)

      // Lấy thông tin hành khách từ mỗi ticket
      passengers.value = booking.value.tickets.map(ticket => ({
        name: ticket.passenger_name || '',
        phone: ticket.passenger_phone || '',
        email: ticket.passenger_email || ''
      }))
    } catch (err) {
      toast.error('Dữ liệu đặt vé không hợp lệ.')
      router.push('/ticket')
    }
  } else {
    toast.error('Không tìm thấy thông tin đặt vé.')
    router.push('/ticket')
  }
})

async function cancelHeldTickets() {
  try {
    const ticketIds = booking.value?.tickets.map(ticket => ticket.id) || []
    if (ticketIds.length === 0) return
    await releaseTickets(ticketIds)
    toast.success('Đã huỷ giữ vé.')
  } catch (err) {
    toast.error('Không thể huỷ giữ vé.')
  }
}

function confirmCancelAndGoBack() {
  Swal.fire({
    title: 'Bạn chắc chắn muốn quay lại?',
    text: 'Thao tác này sẽ hủy giữ vé của bạn.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Vâng, quay lại',
    cancelButtonText: 'Không'
  }).then((result) => {
    if (result.isConfirmed) {
      cancelHeldTickets().then(() => {
        router.back()
      })
    }
  })
}

// ✅ Xử lý thanh toán
async function handlePayment() {
  if (!booking.value) {
    toast.error('Thông tin đặt vé không hợp lệ.')
    return
  }

  const totalAmount = Number(booking.value.total_price || 0)
  const paymentMethod = 'vnpay'

  if (booking.value.tickets.length === 0) {
    toast.error('Không có vé để thanh toán.')
    return
  }

  if (totalAmount <= 0) {
    toast.error('Tổng tiền không hợp lệ.')
    return
  }

  if (passengers.value.some(p => !p.name || !p.phone || !p.email)) {
    toast.error('Vui lòng điền đầy đủ thông tin hành khách cho mỗi vé.')
    return
  }

  const ticketIds = booking.value.tickets.map(ticket => ticket.id)

  // Gộp thông tin hành khách + pickup_point
  const passengerDetails = passengers.value.map((passenger, index) => ({
    name: passenger.name,
    phone: passenger.phone,
    email: passenger.email,
    pickup_point: booking.value?.tickets[index]?.pickup_point || booking.value?.pickup_point?.pickup || ''
  }))

  try {
    toast.info('🔄 Đang tạo hóa đơn...')
    const invoiceRes = await createInvoice(ticketIds, totalAmount, paymentMethod, passengerDetails)
    const invoice = invoiceRes.data

    toast.info('🔗 Đang tạo URL thanh toán...')
    const vnpayRes = await getVnpayPaymentUrl(invoice.id)
    window.location.href = vnpayRes.data.payment_url
  } catch (err: any) {
    toast.error(err?.response?.data?.message || 'Không thể thanh toán.')
  }
}

</script>

<style scoped>
.payment-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
