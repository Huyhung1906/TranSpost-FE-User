<template>
  <div class="bg-white p-4 rounded-xl shadow-md space-y-4">
    <div
      v-for="(method, index) in paymentMethods"
      :key="method.id"
      class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition duration-150"
      :class="{ 'border-t pt-4 mt-2': index === dividerIndex }"
    >
      <input
        type="radio"
        :id="method.id"
        name="paymentMethod"
        v-model="selected"
        :value="method.id"
        class="accent-orange-500 w-4 h-4"
      />
      <label :for="method.id" class="flex items-center gap-3 w-full cursor-pointer">
        <img :src="method.logo" alt="" class="w-7 h-7 object-contain" />
        <div class="flex flex-col">
          <span class="font-medium text-gray-800">{{ method.name }}</span>
          <span v-if="method.promo" class="text-xs text-red-500">{{ method.promo }}</span>
        </div>
      </label>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const selected = ref('vietqr') // hoặc null nếu chưa chọn

const icons = import.meta.glob('@/assets/icon/*.jpg', { eager: true, import: 'default' })

const paymentMethods = [
  { id: 'vietqr', name: 'Thanh toán VietQR', logo: icons['/src/assets/icon/vietqr.jpg'] },
  { id: 'futa', name: 'FUTAPay', logo: icons['/src/assets/icon/futa.jpg'] },
  { id: 'zalopay', name: 'ZaloPay', logo: icons['/src/assets/icon/zalopay.jpg'], promo: 'Giảm 10K cho đơn từ 280K' },
  { id: 'shopeepay', name: 'ShopeePay', logo: icons['/src/assets/icon/shoppe.jpg'], promo: 'Giảm 3% tối đa 200K' },
  { id: 'momo', name: 'MoMo', logo: icons['/src/assets/icon/momo.jpg'], promo: 'Giảm 10K cho đơn từ 140K' },
  { id: 'vnpay', name: 'VNPay', logo: icons['/src/assets/icon/vnpay.jpg'], promo: 'Giảm 15K cho đơn từ 450K' },
  { id: 'viettel', name: 'Viettel Money', logo: icons['/src/assets/icon/viettelmoney.jpg'] },
  { id: 'mbbank', name: 'MB Bank', logo: icons['/src/assets/icon/viettinbank.jpg'] },
  { id: 'atm', name: 'Thẻ ATM nội địa', logo: icons['/src/assets/icon/atm.jpg'] },
  { id: 'visa', name: 'Thẻ Visa/Master/JCB', logo: icons['/src/assets/icon/visa.jpg'] },
]
const dividerIndex = paymentMethods.findIndex(m => m.id === 'atm')

</script>
<style scoped>
input[type="radio"]:checked + label span {
  font-weight: 600;
  color: #e86d1f;
}
</style>