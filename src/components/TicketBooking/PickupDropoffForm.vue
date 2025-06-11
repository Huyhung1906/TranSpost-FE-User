<template>
  <div class="bg-white rounded-2xl shadow-md p-6 space-y-6 border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-800 border-b pb-2">📍 Điểm đón & trả</h3>

    <!-- Grid ngang cho điểm đón và trả -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Điểm đón -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Điểm đón *</label>
        <div class="flex items-center gap-4 mb-3">
          <label class="flex items-center gap-2">
            <input
              type="radio"
              value="office"
              v-model="pickupType"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="text-sm text-gray-700">Bến xe / Văn phòng</span>
          </label>
          <label class="flex items-center gap-2">
            <input
              type="radio"
              value="transfer"
              v-model="pickupType"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="text-sm text-gray-700">Trung chuyển</span>
          </label>
        </div>

        <div v-if="pickupType === 'office'">
          <select
            v-model="pickup"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          >
            <option disabled value="">Chọn bến xe / văn phòng</option>
            <option v-for="location in officeLocations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
        <div v-else>
          <input
            v-model="pickup"
            type="text"
            placeholder="Nhập địa chỉ trung chuyển"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <!-- Điểm trả -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Điểm trả *</label>
        <div class="flex items-center gap-4 mb-3">
          <label class="flex items-center gap-2">
            <input
              type="radio"
              value="office"
              v-model="dropoffType"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="text-sm text-gray-700">Bến xe / Văn phòng</span>
          </label>
          <label class="flex items-center gap-2">
            <input
              type="radio"
              value="transfer"
              v-model="dropoffType"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="text-sm text-gray-700">Trung chuyển</span>
          </label>
        </div>

        <div v-if="dropoffType === 'office'">
          <select
            v-model="dropoff"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          >
            <option disabled value="">Chọn bến xe / văn phòng</option>
            <option v-for="location in officeLocations" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
        <div v-else>
          <input
            v-model="dropoff"
            type="text"
            placeholder="Nhập địa chỉ trung chuyển"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
    </div>

    <!-- Ghi chú -->
    <div class="text-sm text-gray-600 bg-gray-50 border border-dashed border-gray-300 p-4 rounded-lg">
      Quý khách vui lòng có mặt tại <strong>Bến xe/Văn Phòng Quảng Ngãi</strong><br />
      <span class="text-red-600 font-medium">Trước 16:45 10/06/2025</span><br />
      để được trung chuyển hoặc kiểm tra thông tin trước khi lên xe.
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const pickup = ref(props.modelValue?.pickup || '')
const dropoff = ref(props.modelValue?.dropoff || '')
const pickupType = ref(pickup.value ? 'transfer' : 'office')
const dropoffType = ref(dropoff.value ? 'transfer' : 'office')

// Danh sách bến xe/văn phòng
const officeLocations = [
  'VP Quảng Ngãi - 123 Lê Lợi',
  'Bến xe Đức Phổ',
  'VP BX An Sương - HCM',
  'Bến xe Đà Nẵng'
]

watch([pickup, dropoff], () => {
  emit('update:modelValue', {
    pickup: pickup.value,
    dropoff: dropoff.value
  })
})
</script>
