<template>
  <div class="border border-gray-300 rounded-lg shadow-sm p-6 bg-white">
    <h2 class="text-xl font-semibold mb-4">Chọn ghế</h2>
    <div class="flex justify-center gap-12">
      <!-- Tầng 1 -->
      <div>
        <h3 class="font-semibold text-center mb-2">Tầng 1</h3>
        <div class="flex gap-4">
          <div
            v-for="(col, i) in firstFloorColumns"
            :key="'A-col-' + i"
            class="flex flex-col items-center gap-2"
          >
            <Seat
              v-for="seat in col"
              :key="seat.id"
              :seat="seat"
              :selectedSeats="selectedSeats"
              @toggle="toggleSeat"
            />
          </div>
        </div>
      </div>

      <!-- Tầng 2 nếu có -->
      <div v-if="secondFloorColumns.length">
        <h3 class="font-semibold text-center mb-2">Tầng 2</h3>
        <div class="flex gap-4">
          <div
            v-for="(col, i) in secondFloorColumns"
            :key="'B-col-' + i"
            class="flex flex-col items-center gap-2"
          >
            <Seat
              v-for="seat in col"
              :key="seat.id"
              :seat="seat"
              :selectedSeats="selectedSeats"
              @toggle="toggleSeat"
            />
          </div>
        </div>
      </div>

      <!-- Chú thích màu sắc -->
      <div class="mt-6 flex flex-col gap-2 text-sm">
        <Legend color="bg-green-100" text="Ghế trống" />
        <Legend color="bg-blue-600" text="Ghế đã chọn" />
        <Legend color="bg-gray-400" text="Ghế đã bán" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Seat from './Seat.vue'
import Legend from './Legend.vue'

const props = defineProps({
  selectedSeats: Array,
  tickets: Array,
  vehicle: Object
})
const emit = defineEmits(['update:selectedSeats'])

// Map vé theo số ghế
const ticketMap = computed(() => {
  const m = {}
  props.tickets.forEach(t => {
    const key = String(t.seat_number).padStart(2, '0')
    m[key] = t
  })
  return m
})

// Danh sách tất cả ghế đã sắp xếp theo số thứ tự
const allSeats = computed(() =>
  props.tickets
    .map(t => ({
      seat_number: Number(t.seat_number),
      ticket: t
    }))
    .sort((a, b) => a.seat_number - b.seat_number)
)

// Hàm tách danh sách ghế vào các cột dựa theo layout
function splitSeatsIntoColumns(seats, layoutCols, prefix) {
  const columns = layoutCols.map(() => [])
  let seatIndex = 0

  layoutCols.forEach((colCount, colIdx) => {
    for (let i = 0; i < colCount; i++) {
      if (seatIndex >= seats.length) break

      const seat = seats[seatIndex]
      const num = String(seat.seat_number).padStart(2, '0')
      const id = `${prefix}${num}`
      const t = ticketMap.value[num]

      // Xác định trạng thái ghế
      let status = 'available'
      if (!t || t.status === 'available') {
        status = 'available'
      } else {
        status = 'sold'  // Không cho chọn các trạng thái khác
      }

      columns[colIdx].push({
        id,
        seatKey: num,
        status,
        ticketId: t?.id || null
      })

      seatIndex++
    }
  })

  return columns
}
// Layout cột theo loại xe
const firstFloorColumns = computed(() => {
  const layout = props.vehicle?.type?.toLowerCase() === 'luxury' ? [6, 5, 6] : [6, 5]
  const half = Math.ceil(allSeats.value.length / 2)
  const firstFloorSeats = allSeats.value.slice(0, half)
  return splitSeatsIntoColumns(firstFloorSeats, layout, 'A')
})

const secondFloorColumns = computed(() => {
  const layout = props.vehicle?.type?.toLowerCase() === 'luxury' ? [6, 5, 6] : [6, 5]
  const half = Math.ceil(allSeats.value.length / 2)
  const secondFloorSeats = allSeats.value.slice(half)
  return secondFloorSeats.length ? splitSeatsIntoColumns(secondFloorSeats, layout, 'B') : []
})

// Toggle chọn ghế
function toggleSeat(seatId) {
  const prefix = seatId.charAt(0)
  const num = seatId.slice(1)
  const t = ticketMap.value[num]
  console.log('--- Seat clicked ---')
  console.log('Ghế ID:', seatId)
  console.log('Ticket info:', t ?? 'Chưa có vé (ticketId = null)')

  const copy = [...props.selectedSeats]
  const idx = copy.findIndex(s => s.id === seatId)

  if (idx === -1) {
    if (copy.length >= 5) {
      alert('Chỉ được chọn tối đa 5 ghế.')
      return
    }
    copy.push({ id: seatId, ticketId: t?.id || null })
  } else {
    copy.splice(idx, 1)
  }

  emit('update:selectedSeats', copy)
}
</script>
