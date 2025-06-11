<template>
  <div class="max-w-7xl mx-auto px-6 py-8 flex gap-8">
    <!-- Bộ lọc bên trái -->
    <aside class="w-72 bg-white p-6 rounded-xl shadow border border-blue-100 sticky top-8 h-fit">
      <h4 class="text-xl font-semibold text-blue-700 mb-6 border-b border-blue-300 pb-2">Bộ lọc chuyến xe</h4>

      <!-- Khoảng giờ đi -->
      <div class="mb-5">
        <label class="block mb-1 font-medium text-gray-700">Khoảng giờ xuất bến</label>
        <div class="flex items-center gap-2">
          <input
            type="time"
            v-model="filter.departureTimeFrom"
            class="w-1/2 px-3 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-400"
          />
          <span class="font-semibold text-gray-500">-</span>
          <input
            type="time"
            v-model="filter.departureTimeTo"
            class="w-1/2 px-3 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <!-- Loại xe -->
      <div class="mb-5">
        <label class="block mb-1 font-medium text-gray-700">Loại xe</label>
        <select
          v-model="filter.vehicleType"
          class="w-full px-3 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Tất cả</option>
          <option v-for="type in vehicleTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <!-- Tầng xe -->
      <div class="mb-5">
        <label class="block mb-1 font-medium text-gray-700">Tầng xe</label>
        <select
          v-model="filter.deck"
          class="w-full px-3 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Tất cả</option>
          <option value="Trên">Trên</option>
          <option value="Dưới">Dưới</option>
        </select>
      </div>
      <!-- Vị trí ghế -->
      <div class="mb-5">
        <label class="block mb-1 font-medium text-gray-700">Vị trí ghế</label>
        <select
          v-model="filter.seatPosition"
          class="w-full px-3 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Tất cả</option>
          <option value="Đầu">Đầu</option>
          <option value="Giữa">Giữa</option>
          <option value="Cuối">Cuối</option>
        </select>
      </div>

      <!-- Loại ghế -->
      <div class="mb-6">
        <label class="block mb-1 font-medium text-gray-700">Loại ghế</label>
        <select
          v-model="filter.seatType"
          class="w-full px-3 py-2 border rounded-md border-blue-300 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Tất cả</option>
          <option value="Giường">Giường</option>
          <option value="Ngồi">Ngồi</option>
        </select>
      </div>

      <button
        @click="resetFilter"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        Đặt lại bộ lọc
      </button>
    </aside>

    <!-- Danh sách chuyến xe -->
    <section class="flex-1">
      <h3 class="text-2xl font-bold text-blue-700 mb-6 text-center">Danh sách chuyến xe</h3>

      <div v-if="filteredTrips.length" class="grid gap-6">
        <div
          v-for="trip in filteredTrips"
          :key="trip.id"
          class="bg-white border border-blue-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300"
        >
          <!-- Header -->
          <div class="flex justify-between items-start mb-3">
            <div>
              <p class="text-xl font-semibold text-gray-800 mb-1">
                {{ trip.from }} ({{ trip.departureStation }}) → {{ trip.to }} ({{ trip.arrivalStation }})
              </p>
              <p class="text-sm text-gray-500">
                Tên xe: <span class="text-gray-700 font-medium">{{ trip.vehicleName }}</span>
              </p>
            </div>
            <div class="text-right">
<p class="text-xl font-bold text-green-600">
  {{ (trip.price ?? 0).toLocaleString() }} đ
</p>              <p class="text-sm text-gray-500 mt-1">Còn {{ trip.availableSeats }} ghế trống</p>
            </div>
          </div>

          <!-- Timeline giờ đi - thời gian - giờ đến -->
          <div class="flex items-center text-sm text-gray-700 bg-blue-50 rounded-lg p-4 mb-4 relative">
            <!-- Giờ xuất bến -->
            <div class="flex flex-col items-center w-20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="font-semibold text-blue-600">{{ trip.departureTime }}</span>
            </div>

            <!-- Đường timeline -->
            <div class="flex-1 mx-4 h-2 bg-blue-200 rounded-full relative">
              <div class="absolute top-0 left-0 bottom-0 bg-blue-400 rounded-full" :style="{ width: '100%' }"></div>
              <div class="absolute top-0 left-1/2 bottom-0 bg-white w-1 h-4 -translate-x-1/2"></div>
            </div>

            <!-- Thời gian di chuyển -->
            <div class="flex flex-col items-center w-28">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="font-semibold text-blue-600">{{ trip.duration }}</span>
            </div>

            <!-- Đường timeline -->
            <div class="flex-1 mx-4 h-2 bg-blue-200 rounded-full relative">
              <div class="absolute top-0 left-0 bottom-0 bg-blue-400 rounded-full" :style="{ width: '100%' }"></div>
              <div class="absolute top-0 left-1/2 bottom-0 bg-white w-1 h-4 -translate-x-1/2"></div>
            </div>

            <!-- Giờ đến -->
            <div class="flex flex-col items-center w-20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l-3 3" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="font-semibold text-blue-600">{{ trip.arrivalTime }}</span>
            </div>
          </div>

          <!-- Button chọn chuyến -->
          <div class="text-right">
            <button
              @click="selectTrip(trip)"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Chọn chuyến
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-12 text-lg">
        Không tìm thấy chuyến xe phù hợp.
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import  { useRouter} from  'vue-router'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


const props = defineProps({
  trips: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select'])

// Bộ lọc
const filter = ref({
  departureTimeFrom: '',
  departureTimeTo: '',
  vehicleType: '',
  deck: '',
  seatPosition: '',
  seatType: '',
})

// Lấy các loại xe từ dữ liệu trips (ví dụ trường vehicleType)
const vehicleTypes = computed(() => {
  const set = new Set()
  props.trips.forEach(t => {
    if (t.vehicleType) set.add(t.vehicleType)
  })
  return Array.from(set)
})

// Hàm parse giờ "HH:mm" sang phút (để so sánh)
function timeToMinutes(t) {
  if (!t) return null
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

// Lọc chuyến xe theo filter
const filteredTrips = computed(() => {
  return props.trips.filter(trip => {
    // So sánh khoảng giờ xuất bến
    const depMinutes = timeToMinutes(trip.departureTime)
    const fromMinutes = timeToMinutes(filter.value.departureTimeFrom)
    const toMinutes = timeToMinutes(filter.value.departureTimeTo)
    const timeMatch = (!fromMinutes || depMinutes >= fromMinutes) && (!toMinutes || depMinutes <= toMinutes)

    // Loại xe
    const vehicleMatch = filter.value.vehicleType ? trip.vehicleType === filter.value.vehicleType : true

    // Tầng xe
    const deckMatch = filter.value.deck ? trip.deck === filter.value.deck : true

    // Vị trí ghế
    const seatPosMatch = filter.value.seatPosition ? trip.seatPosition === filter.value.seatPosition : true

    // Loại ghế
    const seatTypeMatch = filter.value.seatType ? trip.seatType === filter.value.seatType : true

    return timeMatch && vehicleMatch && deckMatch && seatPosMatch && seatTypeMatch
  })
})

function resetFilter() {
  filter.value = {
    departureTimeFrom: '',
    departureTimeTo: '',
    vehicleType: '',
    deck: '',
    seatPosition: '',
    seatType: '',
  }
}
const router = useRouter(); // 🟢 Đây là dòng bị thiếu

function selectTrip(trip) {
  router.push({
    path: '/ticket',
    query: {
      trip: encodeURIComponent(JSON.stringify(trip))
    }
  })
}

</script>
