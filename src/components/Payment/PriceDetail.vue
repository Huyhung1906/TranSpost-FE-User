<template>
  <div class="bg-white p-4 rounded shadow">
    <h3 class="font-semibold text-lg mb-2">Chi tiết giá</h3>

    <div class="flex justify-between">
      <span>Giá vé lượt đi:</span>
      <span>{{ formatCurrency(ticketPrice) }}</span>
    </div>

    <div class="flex justify-between">
      <span>Phí thanh toán:</span>
      <span>{{ formatCurrency(paymentFee) }}</span>
    </div>

    <hr class="my-2" />

    <div class="flex justify-between font-bold text-red-600">
      <span>Tổng tiền:</span>
      <span>{{ formatCurrency(totalPrice) }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  booking: {
    type: Object,
    required: true
  }
})

// Tính giá vé và phí (giả định phí = 0)
const ticketPrice = computed(() => {
  return props.booking?.total_price || 0
})

const paymentFee = computed(() => 0)

const totalPrice = computed(() => ticketPrice.value + paymentFee.value)

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })
}
</script>
