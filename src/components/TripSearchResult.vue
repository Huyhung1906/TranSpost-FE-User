<template>
  <div class="max-w-7xl mx-auto px-6 py-8 flex gap-8">
    <!-- Bộ lọc bên trái -->
  <aside class="w-full md:w-72 bg-white p-6 rounded-xl shadow border border-blue-100 sticky top-8 h-fit">
  <h4 class="text-xl font-semibold text-blue-700 mb-6 border-b border-blue-300 pb-2">Bộ lọc chuyến xe</h4>

  <!-- Giờ xuất bến -->
  <div class="mb-6">
    <label class="block mb-2 font-semibold text-gray-700">Giờ xuất bến</label>
    <div class="flex gap-2 items-center">
      <input type="time" v-model="filter.departureTimeFrom" class="w-1/2 border rounded-md px-3 py-1.5" />
      <span class="text-gray-500">-</span>
      <input type="time" v-model="filter.departureTimeTo" class="w-1/2 border rounded-md px-3 py-1.5" />
    </div>
  </div>
  <hr class="mb-6 border-gray-300" />

  <!-- Loại xe -->
  <div class="mb-6">
    <label class="block mb-2 font-semibold text-gray-700">Loại xe</label>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="type in ['', 'Limousine', 'Luxury']"
        :key="type"
        :class="[
          'px-3 py-1 text-sm rounded-full border transition',
          filter.vehicleType === type
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white border-gray-300 text-gray-700'
        ]"
        @click="filter.vehicleType = type"
      >
        {{ type || 'Tất cả' }}
      </button>
    </div>
  </div>
  <hr class="mb-6 border-gray-300" />

  <!-- Tầng -->
  <div class="mb-6">
    <label class="block mb-2 font-semibold text-gray-700">Tầng</label>
    <div class="space-y-2">
      <label class="flex items-center gap-2">
        <input type="checkbox" value="Trên" v-model="filter.deck" /> <span>Trên</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" value="Dưới" v-model="filter.deck" /> <span>Dưới</span>
      </label>
    </div>
  </div>
  <hr class="mb-6 border-gray-300" />

  <!-- Vị trí ghế -->
  <div class="mb-6">
    <label class="block mb-2 font-semibold text-gray-700">Vị trí ghế</label>
    <div class="space-y-2">
      <label v-for="pos in ['Đầu', 'Giữa', 'Cuối']" :key="pos" class="flex items-center gap-2">
        <input type="checkbox" :value="pos" v-model="filter.seatPosition" />
        <span>{{ pos }}</span>
      </label>
    </div>
  </div>
  <hr class="mb-6 border-gray-300" />

  <!-- Loại ghế -->
  <div class="mb-6">
    <label class="block mb-2 font-semibold text-gray-700">Loại ghế</label>
    <div class="space-y-2">
      <label class="flex items-center gap-2">
        <input type="checkbox" value="Giường" v-model="filter.seatType" /> <span>Giường</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" value="Ngồi" v-model="filter.seatType" /> <span>Ngồi</span>
      </label>
    </div>
  </div>
  <hr class="mb-6 border-gray-300" />

  <button @click="resetFilter"
    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition">
    Đặt lại bộ lọc
  </button>
</aside>
  
    <!-- Danh sách chuyến xe -->
    <section class="flex-1">
      <h3 class="text-2xl font-bold text-blue-700 mb-6 text-center">Danh sách chuyến xe</h3>

      <div v-if="filteredTrips.length" class="grid gap-6">
        <div v-for="trip in filteredTrips" :key="trip.id"
          class="bg-white border border-blue-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300">
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
              </p>
              <p class="text-sm text-gray-500 mt-1">Còn {{ trip.availableSeats }} ghế trống</p>
            </div>
          </div>

          <div class="flex items-center text-sm text-gray-700 bg-blue-50 rounded-lg p-4 mb-4 relative">
            <div class="flex flex-col items-center w-20">
              <svg class="h-6 w-6 text-blue-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
              </svg>
              <span class="font-semibold text-blue-600">{{ trip.departureTime }}</span>
            </div>

            <div class="flex-1 mx-4 h-2 bg-blue-200 rounded-full relative">
              <div class="absolute top-0 left-0 bottom-0 bg-blue-400 rounded-full w-full"></div>
              <div class="absolute top-0 left-1/2 bottom-0 bg-white w-1 h-4 -translate-x-1/2"></div>
            </div>

            <div class="flex flex-col items-center w-28">
              <svg class="h-6 w-6 text-blue-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
              </svg>
              <span class="font-semibold text-blue-600">{{ trip.duration }}</span>
            </div>

            <div class="flex-1 mx-4 h-2 bg-blue-200 rounded-full relative">
              <div class="absolute top-0 left-0 bottom-0 bg-blue-400 rounded-full w-full"></div>
              <div class="absolute top-0 left-1/2 bottom-0 bg-white w-1 h-4 -translate-x-1/2"></div>
            </div>

            <div class="flex flex-col items-center w-20">
              <svg class="h-6 w-6 text-blue-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l-3 3" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
              </svg>
              <span class="font-semibold text-blue-600">{{ trip.arrivalTime }}</span>
            </div>
          </div>

          <div class="mt-3 text-sm text-gray-700 font-medium leading-snug">
            <span class="text-red-600 font-semibold">Lưu ý:</span> Chuyến xe này có lịch trình đi ngang cao tốc
            <span class="font-semibold">Nha Trang - Hồ Chí Minh</span>
            <span class="relative group inline-block cursor-help text-blue-600 font-semibold ml-1">
              ... xem thêm
              <div
                class="absolute bottom-full left-0 mb-3 w-72 p-4 bg-white border border-gray-300 rounded-lg shadow-lg text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                Chuyến xe này chạy cao tốc từ Nha Trang đến Hồ Chí Minh, không dừng chân tại các trạm dọc đường để tránh
                chậm trễ lịch trình. Vui lòng chuẩn bị kỹ càng trước khi lên xe.
              </div>
            </span>
          </div>

          <div class="text-right mt-4">
            <button @click="selectTrip(trip)"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition">
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
import { useRouter } from 'vue-router'

const props = defineProps({
  trips: Array
})

const emit = defineEmits(['select'])

const filter = ref({
  departureTimeFrom: '',
  departureTimeTo: '',
  vehicleType: '',
  deck: '',
  seatPosition: '',
  seatType: ''
})

const router = useRouter()

function timeToMinutes(t) {
  if (!t) return null
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

const vehicleTypes = computed(() => {
  const set = new Set()
  props.trips.forEach(t => {
    if (t.vehicleType) set.add(t.vehicleType)
  })
  return [...set]
})

const filteredTrips = computed(() => {
  return props.trips.filter(trip => {
    const depMinutes = timeToMinutes(trip.departureTime)
    const fromMinutes = timeToMinutes(filter.value.departureTimeFrom)
    const toMinutes = timeToMinutes(filter.value.departureTimeTo)

    const timeMatch = (!fromMinutes || depMinutes >= fromMinutes) &&
                      (!toMinutes || depMinutes <= toMinutes)

    const vehicleMatch = filter.value.vehicleType ? trip.vehicleType === filter.value.vehicleType : true
    const deckMatch = filter.value.deck ? trip.deck === filter.value.deck : true
    const seatPosMatch = filter.value.seatPosition ? trip.seatPosition === filter.value.seatPosition : true
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
    seatType: ''
  }
}

function selectTrip(trip) {
  router.push({
    path: '/ticket',
    query: {
      trip: encodeURIComponent(JSON.stringify(trip))
    }
  })
}
</script>
