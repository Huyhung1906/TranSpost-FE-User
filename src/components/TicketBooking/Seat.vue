<template>
  <div
    :class="[
      'w-10 h-10 rounded-md flex items-center justify-center cursor-pointer border',
      seatClass
    ]"
    @click="handleClick"
  >
    {{ seat.seatKey }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  seat: Object,
  selectedSeats: Array
})
const emit = defineEmits(['toggle'])

const isSelected = computed(() =>
  props.selectedSeats.some(s => s.id === props.seat.id)
)

const seatClass = computed(() => {
  if (props.seat.status === 'sold') return 'bg-gray-400 text-white cursor-not-allowed'
  if (isSelected.value) return 'bg-blue-600 text-white'
  return 'bg-green-100 hover:bg-green-200'
})

function handleClick() {
  if (props.seat.status === 'sold') return
  emit('toggle', props.seat.id)
}
</script>
