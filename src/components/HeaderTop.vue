<template>
  <div class="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500">
    <div class="flex justify-between items-center px-6 py-3 text-lg font-medium relative">
      <!-- Left -->
      <div class="flex gap-4 items-center">
        <select v-model="selectedLanguage" class="bg-transparent text-white cursor-pointer px-1.5 py-0.5 rounded appearance-none text-sm">
          <option value="vn" class="text-black">🇻🇳 Tiếng Việt</option>
          <option value="en" class="text-black">🇬🇧 English</option>
        </select>
        <div class="h-5 w-px bg-white opacity-50"></div>
        <select v-model="selectedApp" class="bg-transparent text-white cursor-pointer px-1.5 py-0.5 rounded appearance-none text-sm">
          <option value="ios" class="text-black">iOS</option>
          <option value="android" class="text-black">Android</option>
        </select>
      </div>

      <!-- Center: Logo -->
      <div class="absolute left-1/2 transform -translate-x-1/2">
        <img src="@/assets/img/banner1.png" alt="FUTA Logo" class="h-16 w-auto object-contain rounded-2xl shadow-2xl transition duration-300 hover:scale-105" />
      </div>

      <!-- Right -->
      <div class="flex items-center gap-4 relative">
        <template v-if="isLoggedIn">
          <div class="relative">
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="bg-gray-800 px-4 py-2 rounded-full text-sm text-white font-medium shadow flex items-center gap-2"
            >
              👤 {{ username }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <ul class="text-sm text-gray-800">
                <li>
                  <button @click="goToProfile" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Thông tin tài khoản</button>
                </li>
                <li>
                  <button @click="goToHistory" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Lịch sử mua</button>
                </li>
                <li>
                  <button @click="goToChangePassword" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Đổi mật khẩu</button>
                </li>
                <li>
                  <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100">Đăng xuất</button>
                </li>
              </ul>
            </div>
          </div>
        </template>

        <template v-else>
          <button @click="handleLogin" class="bg-white text-blue-800 hover:bg-gray-100 px-5 py-2 rounded-full text-sm font-semibold transition shadow">
            Đăng nhập
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')
const selectedLanguage = ref('vn')
const selectedApp = ref('ios')
const isDropdownOpen = ref(false)

function handleLogout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('fullname')
  delete axios.defaults.headers.common['Authorization']
  username.value = ''
  isLoggedIn.value = false
  router.push('/')
}

function handleLogin() {
  router.push('/login')
}

function goToProfile() {
  localStorage.setItem('user_tab', 'info')
  isDropdownOpen.value = false
  router.push('/User')
}

function goToHistory() {
  localStorage.setItem('user_tab', 'history')
  isDropdownOpen.value = false
  router.push('/User')
}

function goToChangePassword() {
  localStorage.setItem('user_tab', 'changePassword')
  isDropdownOpen.value = false
  router.push('/User')
}

onMounted(() => {
  const storedName = localStorage.getItem('fullname')
  if (storedName) {
    username.value = storedName
    isLoggedIn.value = true
  }

  // Đóng dropdown khi click ngoài
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      isDropdownOpen.value = false
    }
  })
})
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%227%22%20viewBox%3D%220%200%2010%207%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%200l5%207%205-7z%22%20fill%3D%22white%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.3rem center;
  background-size: 10px 7px;
  padding-right: 1.25rem;
  border: none;
  outline: none;
  font-weight: 500;
}
</style>
