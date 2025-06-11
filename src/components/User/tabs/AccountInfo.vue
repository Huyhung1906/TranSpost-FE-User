<template>
  <div v-if="profile" class="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
    <!-- Header -->
    <div class="flex items-center space-x-6 mb-6">
      <!-- Avatar -->
      <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
        <!-- Placeholder nếu không có avatar -->
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5"
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"/>
        </svg>
      </div>
      <!-- User Info -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900">{{ profile.fullname }}</h2>
        <p class="text-gray-500">Tài khoản cá nhân</p>
      </div>
    </div>

    <!-- Info Box -->
    <div class="border-t border-gray-200 pt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-500">Email</p>
          <p class="text-base font-medium text-gray-800">{{ profile.email }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Số điện thoại</p>
          <p class="text-base font-medium text-gray-800">{{ profile.phone }}</p>
        </div>
      </div>
    </div>
  </div>

  <p v-else class="text-center text-gray-500 mt-8">Đang tải thông tin người dùng...</p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const profile = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (!token) return

  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    profile.value = res.data.data.user
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error)
  }
})
</script>

<style scoped>
/* Add subtle hover or animation if needed */
</style>
