<template>
  <div class="bg-blue-50 border border-blue-200 shadow-lg shadow-blue-100 p-8 mx-auto rounded-xl max-w-5xl">
    <div class="flex justify-between items-center mb-8 text-lg font-semibold text-blue-700">
      <!-- Radio bên trái -->
      <div class="flex gap-10">
        <label class="cursor-pointer flex items-center gap-3">
          <input type="radio" v-model="tripType" value="oneway" class="accent-blue-400 w-6 h-6" />
          Một chiều
        </label>
        <label class="cursor-pointer flex items-center gap-3">
          <input type="radio" v-model="tripType" value="roundtrip" class="accent-blue-400 w-6 h-6" />
          Khứ hồi
        </label>
      </div>

      <!-- Link hướng dẫn bên phải -->
      <a href="#" class="text-blue-600 hover:underline font-semibold">
        Hướng dẫn mua vé
      </a>
    </div>

    <div class="flex gap-4 items-center justify-center">
      <select
        v-model="from"
        class="text-lg px-6 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 w-72 transition"
      >
        <option disabled value="">Điểm đi</option>
        <option v-for="point in departurePoints" :key="point" :value="point">{{ point }}</option>
      </select>

      <!-- Switch button -->
      <button
        @click="switchLocations"
        :class="['p-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 shadow-md transition-transform duration-300 ease-in-out', { 'animate-switch': isSwitching }]"
        aria-label="Đổi vị trí điểm đi và điểm đến"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 17h16M12 4l4 4m0 0l-4 4m4-4H8m4 12l-4-4m0 0l4-4" />
        </svg>
      </button>

      <select
        v-model="to"
        class="text-lg px-6 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 w-72 transition"
      >
        <option disabled value="">Điểm đến</option>
        <option v-for="point in destinationPoints" :key="point" :value="point">{{ point }}</option>
      </select>

      <input
        type="date"
        v-model="date"
        class="text-lg px-6 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 w-60 transition"
      />
      <select
        v-model="seats"
        class="text-lg px-6 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 w-36 transition"
      >
        <option value="1">1 vé</option>
        <option value="2">2 vé</option>
        <option value="3">3 vé</option>
      </select>
    </div>

    <div class="text-center mt-10">
      <button
        @click="submit"
        class="bg-blue-400 text-white font-bold rounded-full px-14 py-4 text-xl hover:bg-blue-500 transition"
      >
        Tìm chuyến xe
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tripType = ref('oneway')
const from = ref('')
const to = ref('')
const date = ref(new Date().toISOString().substring(0, 10))
const seats = ref(1)

const routeList = ref([])
const departurePoints = ref([])
const destinationPoints = ref([])

const emit = defineEmits(['search'])

const isSwitching = ref(false)

function switchLocations() {
  if (isSwitching.value) return

  isSwitching.value = true
  setTimeout(() => {
    const temp = from.value
    from.value = to.value
    to.value = temp
    isSwitching.value = false
  }, 300)
}

async function submit() {
  // Tìm route tương ứng từ danh sách
  const matchedRoute = routeList.value.find(
    r => r.departure_point === from.value && r.destination_point === to.value
  )

  if (!matchedRoute) {
    alert('Không tìm thấy tuyến đường phù hợp!')
    return
  }

  const routeId = matchedRoute.id
  const apiUrl = `${import.meta.env.VITE_API_URL}/trip/?route_id=${routeId}&date=${date.value}`

  try {
    const res = await axios.get(apiUrl)
    if (res.data.status === 200) {
      const trips = res.data.data
      emit('search', {
        trips,
        seats: seats.value,
        tripType: tripType.value,
        from: from.value,
        to: to.value,
        date: date.value
      })
    } else {
      alert('Không tìm thấy chuyến xe phù hợp.')
    }
  } catch (err) {
    console.error('Lỗi khi tìm chuyến:', err)
    alert('Lỗi khi gọi API tìm chuyến.')
  }
}


// Gọi API để lấy danh sách tuyến đường
onMounted(async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/route/list`)
    if (res.data.status === 200) {
      routeList.value = res.data.data

      // Trích xuất điểm đi và đến duy nhất
      const departures = new Set()
      const destinations = new Set()

      res.data.data.forEach(route => {
        departures.add(route.departure_point)
        destinations.add(route.destination_point)
      })

      departurePoints.value = Array.from(departures)
      destinationPoints.value = Array.from(destinations)

      // Thiết lập mặc định
      from.value = departurePoints.value[0] || ''
      to.value = destinationPoints.value[0] || ''
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tuyến:', error)
  }
})

</script>

<style scoped>
@keyframes switch-bumchiu {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.3) rotate(15deg);
  }
  50% {
    transform: scale(1.3) rotate(-15deg);
  }
  75% {
    transform: scale(1.3) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.animate-switch {
  animation: switch-bumchiu 0.3s ease-in-out forwards;
}
</style>
