<template>
  <div class="bg-gray-100 min-h-screen">
    <HeaderBar />
    <TripInfoHeader :trip="trip" v-if="trip" />

    <div class="max-w-6xl mx-auto px-4">
      <div
        class="grid gap-4 py-6 grid-cols-1 md:grid-cols-3"
        v-if="trip"
      >
        <div class="md:col-span-2 space-y-4">
          <SeatSelection
            v-if="trip?.vehicle"
            :vehicle="trip.vehicle"
            :tickets="trip.tickets"
            :selectedSeats="selectedSeats"
            @update:selectedSeats="selectedSeats = $event"
          />

          <CustomerInfoForm v-model:customer="customer" />
          <PickupDropoffForm v-model="pickupInfo" />
          <TotalAndPayment
            :total="selectedSeats.length * (trip?.price || 0)"
            @pay="handlePayment"
          />
        </div>

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
import { useRoute } from 'vue-router'
import axios from 'axios'

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
import { useToast } from 'vue-toastification'

const route = useRoute()
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

const toast = useToast()

async function fetchTripDetail(tripId) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/trip/info/${tripId}/`)
    trip.value = res.data.data.trip
    console.log(trip)
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
      } else {
        console.warn('Không có tripId trong query.')
      }
    } catch (e) {
      console.error('Lỗi parse trip từ query:', e)
    }
  } else {
    console.warn('Không tìm thấy trip trong query string.')
  }
})

function handlePayment() {
  if (selectedSeats.value.length === 0) {
    toast.warning('Vui lòng chọn ít nhất một vé trước khi thanh toán.', {
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    return
  }
  if (!customer.value.name || !customer.value.phone) {
    toast.warning('Vui lòng điền đầy đủ thông tin khách hàng.', {
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    return
  }
  if (!pickupInfo.value.pickup || !pickupInfo.value.dropoff) {
    toast.warning('Vui lòng chọn điểm đón và điểm trả.', {
      position: 'top-right',
      timeout: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
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
  user_id : userId,
  total_price: selectedSeats.value.length * (trip.value?.price || 0),
  created_at: shiftedISOString,  // thời gian hiện tại theo chuẩn ISO
  tickets: ticketsPayload
}


  console.log('🔹 JSON gửi đi để cập nhật vé:')
  console.log(JSON.stringify(payload, null, 2))
}
</script>
