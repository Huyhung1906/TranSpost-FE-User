<template>
  <div class="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
    <h2 class="text-2xl font-bold text-gray-900">Thông tin khách hàng & Điều khoản</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Thông tin khách hàng -->
      <div class="space-y-5">
        <FormInput
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          v-model="form.name"
          :error="errors.name"
          required
        />
        <FormInput
          label="Số điện thoại"
          type="tel"
          placeholder="0123456789"
          v-model="form.phone"
          :error="errors.phone"
          required
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="email@example.com"
          v-model="form.email"
          :error="errors.email"
        />
      </div>

      <!-- Điều khoản -->
      <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 text-sm text-gray-800 space-y-4">
        <p class="font-semibold text-base text-gray-900">Lưu ý khi đặt vé:</p>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
          <li>Vui lòng có mặt tại điểm đón trước giờ khởi hành ít nhất 30 phút.</li>
          <li>Vé đã mua không hoàn/hủy sau khi thanh toán.</li>
          <li>Thông tin hành khách phải chính xác để đảm bảo quyền lợi.</li>
          <li>Trong trường hợp cần hỗ trợ, vui lòng liên hệ tổng đài.</li>
        </ul>
      </div>
    </div>

    <!-- Checkbox điều khoản -->
    <div class="flex items-start space-x-3">
      <input
        id="accept-terms"
        type="checkbox"
        v-model="form.acceptTerms"
        class="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
      <label for="accept-terms" class="text-sm text-gray-700">
        Tôi đồng ý với <span class="text-blue-600 font-medium hover:underline">điều khoản của Công ty ABC</span>
      </label>
    </div>
    <p v-if="errors.acceptTerms" class="text-red-500 text-sm mt-1">{{ errors.acceptTerms }}</p>

    <div class="pt-4">
      <button
        @click="handleSubmit"
        class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition font-medium"
      >
        Xác nhận thông tin
      </button>
    </div>
  </div>
</template>

<script setup>
import FormInput from './FormInput.vue'
import { reactive, watchEffect } from 'vue'

// Nhận props và emit
const props = defineProps({
  customer: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:customer'])

// Gán dữ liệu vào form
const form = reactive({
  name: props.customer.name || '',
  phone: props.customer.phone || '',
  email: props.customer.email || '',
  acceptTerms: false
})

// Emit khi có thay đổi
watchEffect(() => {
  emit('update:customer', {
    name: form.name,
    phone: form.phone,
    email: form.email
  })
})

// Lỗi
const errors = reactive({
  name: '',
  phone: '',
  email: '',
  acceptTerms: '',
})

// Validate
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone)
}

function handleSubmit() {
  let isValid = true
  errors.name = form.name.trim() ? '' : 'Họ tên không được để trống.'
  errors.phone = isValidPhone(form.phone) ? '' : 'Số điện thoại phải gồm 10 chữ số.'
  errors.email = form.email && !isValidEmail(form.email) ? 'Email không hợp lệ.' : ''
  errors.acceptTerms = form.acceptTerms ? '' : 'Bạn phải đồng ý điều khoản.'

  isValid = !errors.name && !errors.phone && !errors.email && !errors.acceptTerms

  if (isValid) {
    console.log('✅ Dữ liệu hợp lệ:', { ...form })
    // Nếu muốn chỉ emit ở đây thay vì watchEffect:
    // emit('update:customer', {
    //   name: form.name,
    //   phone: form.phone,
    //   email: form.email
    // })
  } else {
    console.warn('❌ Dữ liệu không hợp lệ.')
  }
}
</script>
