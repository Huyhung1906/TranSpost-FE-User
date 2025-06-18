<template>
  <div class="bg-gray-100 min-h-screen">
    <HeaderBar />
    <TripInfoHeader :trip="trip" v-if="trip" />

    <div class="max-w-6xl mx-auto px-4">
      <div class="grid gap-4 py-6 grid-cols-1 md:grid-cols-3" v-if="trip">
        <!-- Left column -->
        <div class="md:col-span-2 space-y-4">
          <SeatSelection v-if="trip?.vehicle" :vehicle="trip.vehicle" :tickets="trip.tickets"
            :selectedSeats="selectedSeats" @update:selectedSeats="selectedSeats = $event" />

          <CustomerInfoForm v-model:customer="customer" />
          <PickupDropoffForm v-model="pickupInfo" />
          <TotalAndPayment :total="selectedSeats.length * (trip?.price || 0)" @pay="handlePayment" />
        </div>

        <!-- Right column -->
        <div class="md:col-span-1 space-y-4">
          <TripSummary :trip="trip" :selectedSeats="selectedSeats" />
          <PriceDetail :trip="trip" :selectedSeats="selectedSeats" />
        </div>
      </div>
    </div>

    <Info />
    <Footer />
    <ChatWidget />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import HeaderBar from '@/components/HeaderTop.vue'
import TripInfoHeader from '@/components/TicketBooking/TripInfoHeader.vue'
import SeatSelection from '@/components/TicketBooking/SeatSelection.vue'
import CustomerInfoForm from '@/components/TicketBooking/CustomerInfoForm.vue'
import TripSummary from '@/components/TicketBooking/TripSummary.vue'
import PriceDetail from '@/components/TicketBooking/PriceDetail.vue'
import PickupDropoffForm from '@/components/TicketBooking/PickupDropoffForm.vue'
import TotalAndPayment from '@/components/TicketBooking/TotalAndPayment.vue'
import Info from '@/components/Info.vue'
import Footer from '@/components/Footer.vue'
import ChatWidget from '@/components/ChatWidget.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const trip = ref(null)
const selectedSeats = ref([])

const customer = ref({
  name: '',
  phone: '',
  email: ''
})

const pickupInfo = ref({
  pickup: '',
  dropoff: ''
})

async function fetchTripDetail(tripId) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/trip/info/${tripId}/`)
    trip.value = res.data.data.trip
  } catch (err) {
    console.error('Không thể tải thông tin chuyến xe:', err)
  }
}

onMounted(() => {
  if (route.query.trip) {
    try {
      const queryTrip = JSON.parse(decodeURIComponent(route.query.trip))
      const tripId = queryTrip.id
      if (tripId) {
        fetchTripDetail(tripId)
      }
    } catch (e) {
      console.error('Lỗi parse trip từ query:', e)
    }
  }
})

async function handlePayment() {
  if (selectedSeats.value.length === 0) {
    toast.warning('Vui lòng chọn ít nhất một vé.')
    return
  }

  if (!customer.value.name || !customer.value.phone) {
    toast.warning('Vui lòng nhập thông tin khách hàng.')
    return
  }

  if (!pickupInfo.value.pickup || !pickupInfo.value.dropoff) {
    toast.warning('Vui lòng chọn điểm đón và trả.')
    return
  }

  const ticketsPayload = selectedSeats.value.map(seat => ({
    id: seat.ticketId,
    passenger_name: customer.value.name,
    passenger_phone: customer.value.phone,
    passenger_email: customer.value.email || '',
    pickup_point: pickupInfo.value.pickup,
    status: 'booked'
  }))

  const userId = localStorage.getItem('id')
  const date = new Date()
  const datePlus7h = new Date(date.getTime() + 7 * 3600 * 1000)
  const shiftedISOString = datePlus7h.toISOString()

const payload = {
  user_id: userId,
  total_price: selectedSeats.value.length * (trip.value?.price || 0),
  created_at: shiftedISOString,
  tickets: ticketsPayload,
  pickup_point: pickupInfo.value,
  trip: {
    id: trip.value?.id,
    route: trip.value?.route,
    departure_time: trip.value?.departure_time,
    vehicle: trip.value?.vehicle,
    price: trip.value?.price
    // thêm gì nữa tùy ý bạn cần hiển thị ở trang Payment
  }
}


  const ticketIds = ticketsPayload.map(t => t.id)

  try {
    const holdRes = await axios.post(`${import.meta.env.VITE_API_URL}/invoice/hold/`, {
      ticket_ids: ticketIds
    })

    if (holdRes.status === 200) {
      toast.success(holdRes.data.message || 'Giữ vé thành công')
      router.push({
        name: 'PaymentPage',
        query: {
          booking: encodeURIComponent(JSON.stringify(payload))
        }
      })
    } else {
      toast.error(holdRes.data.message || 'Không thể giữ vé. Vui lòng thử lại.')
    }

  } catch (err) {
    console.error('Lỗi khi giữ vé:', err)
    toast.error('Đã xảy ra lỗi khi giữ vé.')
  }
}
</script>
