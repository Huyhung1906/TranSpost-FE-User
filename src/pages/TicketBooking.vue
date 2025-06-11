<template>
  <div class="bg-gray-100">
    <HeaderBar />
    <TripInfoHeader :trip="trip" v-if="trip" />

    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-3 gap-4 py-6" v-if="trip">
        <div class="col-span-2 space-y-4">
          <SeatSelection v-if="trip?.vehicle" :vehicle="trip.vehicle" :tickets="trip.tickets"
            :selectedSeats="selectedSeats" @update:selectedSeats="selectedSeats = $event" />

          <CustomerInfoForm v-model:customer="customer" />
          <PickupDropoffForm v-model="pickupInfo" />
          <TotalAndPayment :total="selectedSeats.length * (trip?.price || 0)" @pay="handlePayment" />
        </div>

        <div class="col-span-1 space-y-4">
          <TripSummary :trip="trip" :selectedSeats="selectedSeats" />
          <PriceDetail :trip="trip" :selectedSeats="selectedSeats" />
        </div>
      </div>
    </div>
  </div>

  <Info />
  <Footer />
  <ChatWidget />
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

const route = useRoute()
const trip = ref(null)
const selectedSeats = ref([])

const customer = ref({
  name: '',
  phone: ''
})

const pickupInfo = ref({
  pickup: '',
  dropoff: ''
})

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
  // TODO: Gọi API tạo vé từ selectedSeats + customer + pickupInfo + trip
  console.log('Thanh toán:', {
    trip: trip.value,
    seats: selectedSeats.value,
    customer: customer.value,
    pickup: pickupInfo.value
  })
}
</script>
