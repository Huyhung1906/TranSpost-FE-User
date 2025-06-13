<template>
  <div v-if="profile" class="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
    <!-- Header -->
    <div class="flex items-center space-x-6 mb-6">
      <!-- Avatar -->
      <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
        <!-- Placeholder nếu không có avatar -->
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z" />
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
        <div>
          <p class="text-sm text-gray-500">Giới tính</p>
          <p class="text-base font-medium text-gray-800">Nam</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Ngày sinh</p>
          <p class="text-base font-medium text-gray-800">19/06/2003</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Khách hàng thân thiết</p>
          <div class="flex items-center gap-2 text-base font-medium" :class="{
            'text-gray-500': profile.level === 'silver',
            'text-yellow-500': profile.level === 'gold',
            'text-purple-600': profile.level === 'diamond'
          }">
            <svg v-if="profile.level === 'silver'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
              fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z" />
            </svg>
            <svg v-if="profile.level === 'gold'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M12 2l2.5 6h6.5l-5 4 2 6-5.5-3.5L7.5 18l2-6-5-4h6.5z" />
            </svg>
            <svg v-if="profile.level === 'diamond'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
              fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l4 4h4l-6 6 6 6h-4l-4 4-4-4H4l6-6-6-6h4z" />
            </svg>

            <span>
              {{
                profile.level === 'silver' ? 'Thành Viên Bạc' :
                  profile.level === 'gold' ? 'Thành Viên Vàng' :
                    profile.level === 'diamond' ? 'Thành Viên Kim Cương' :
              'Chưa phân loại'
              }}
            </span>
          </div>
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
