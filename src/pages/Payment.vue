<template>
  <div class="payment-page">
    <Header />
    <InfoDay />
    <div class="content grid grid-cols-3 gap-4 p-6 max-w-6xl mx-auto px-4">
      <div class="col-span-2">
        <h2 class="text-xl font-bold mb-4">Chọn phương thức thanh toán</h2>
        <div class="grid grid-cols-2 gap-4">
          <PaymentMethod />
          <QrCodePayment />
        </div>
      </div>
      <div class="col-span-1 space-y-4">
        <PassengerInfo />
        <TripInfo />
        <PriceDetail />
      </div>
    </div>
    <Info />
    <Footer />
    <ChatWidget />
  </div>
</template>


<script setup>
import Header from '@/components/HeaderTop.vue'
import InfoDay from '@/components/Payment/InfoDay.vue'
import Footer from '@/components/Footer.vue'
import QrCodePayment from '@/components/Payment/QrCodePayment.vue' // ✅ THÊM DÒNG NÀY
import PassengerInfo from '@/components/Payment/PassengerInfo.vue'
import TripInfo from '@/components/Payment/TripInfo.vue'
import PriceDetail from '@/components/Payment/PriceDetail.vue'
import PaymentMethod from '@/components/Payment/PaymentMethod.vue'
import Info from '@/components/Info.vue'
import ChatWidget from '@/components/ChatWidget.vue'
</script>

<style scoped>
.payment-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
