<template>
  <div class="bg-gray-100">
   <header class="text-white w-full shadow font-sans">
    <HeaderTop />
    <Navbar />
  </header>
  <Banner />
  <TripSearchForm @search="handleSearch" />
  <TripSearchResult :trips="tripList" />
  <PromotionSection />
  <HighLight />
  <Info />
  <Footer />
  <ChatWidget />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import HeaderTop from '@/components/HeaderTop.vue'
import Navbar from '@/components/Navbar.vue'

import Banner from '@/components/Banner.vue'
import TripSearchForm from '@/components/TripSearchForm.vue'
import TripSearchResult from '@/components/TripSearchResult.vue'
import PromotionSection from '@/components/PromotionSection.vue'
import HighLight from '@/components/HighLight.vue'
import Info from '@/components/Info.vue'

import Footer from '@/components/Footer.vue'
import ChatWidget from '@/components/ChatWidget.vue'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)

function formatTime(dateStr) {
  if (!dateStr) return ''
  return dayjs.utc(dateStr).format('HH:mm')
}

const tripList = ref([])

function formatDuration(durationStr) {
  if (!durationStr) return ''
  const parts = durationStr.split(':')
  if (parts.length < 2) return ''
  const hours = parseInt(parts[0], 10)
  const minutes = parseInt(parts[1], 10)
  if (minutes === 0) return `${hours} giờ`
  return `${hours} giờ ${minutes} phút`
}

function mapApiTripToDisplay(trip) {
  return {
    id: trip.id,
    from: trip.route.departure_point,
    departureStation: `${trip.route.departure_point}`,
    to: trip.route.destination_point,
    arrivalStation: `${trip.route.destination_point}`,
    vehicleName: trip.vehicle.name,
    vehicleType: trip.vehicle.type,
    deck: '',
    seatPosition: '',
    seatType: '',
    departureTime: formatTime(trip.departure_time),
    arrivalTime: formatTime(trip.arrival_time),
    duration: formatDuration(trip.route.estimated_time),
    price: Number(trip.price),
    availableSeats: trip.vehicle.chair - trip.sold_tickets
  }
}

function handleSearch(params) {
  console.log('Tìm chuyến với:', params)
  if (params.trips && Array.isArray(params.trips) && params.trips.length > 0) {
    tripList.value = params.trips.map(mapApiTripToDisplay)
  } else {
    tripList.value = []  // Không có chuyến nào
  }
}
</script>
