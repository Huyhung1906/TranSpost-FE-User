<template>
  <header class="text-white w-full shadow font-sans">
    <!-- Top Row -->
    <div class="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500">
      <div class="flex justify-between items-center px-6 py-3 text-lg font-medium relative">
        <!-- Left: Language and App Select -->
        <div class="flex gap-4 items-center">
          <select
            v-model="selectedLanguage"
            class="bg-transparent text-white cursor-pointer px-1.5 py-0.5 rounded appearance-none text-sm"
            aria-label="Chọn ngôn ngữ"
          >
            <option value="vn" class="text-black">🇻🇳 Tiếng Việt</option>
            <option value="en" class="text-black">🇬🇧 English</option>
          </select>

          <div class="h-5 w-px bg-white opacity-50"></div>

          <select
            v-model="selectedApp"
            class="bg-transparent text-white cursor-pointer px-1.5 py-0.5 rounded appearance-none text-sm"
            aria-label="Chọn nền tảng tải ứng dụng"
          >
            <option value="ios" class="text-black">iOS</option>
            <option value="android" class="text-black">Android</option>
          </select>
        </div>

        <!-- Center: Logo -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="@/assets/img/banner1.png"
            alt="FUTA Logo"
            class="h-16 w-auto object-contain rounded-2xl shadow-2xl transition duration-300 hover:scale-105"
          />
        </div>

        <!-- Right: Login/Logout -->
        <div class="flex items-center gap-4">
          <template v-if="isLoggedIn">
            <div class="bg-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow">
              👤 {{ username }}
            </div>
            <button
              @click="handleLogout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition shadow"
            >
              Đăng xuất
            </button>
          </template>
          <template v-else>
            <button
              @click="handleLogin"
              class="bg-white text-blue-800 hover:bg-gray-100 px-5 py-2 rounded-full text-sm font-semibold transition shadow"
            >
              Đăng nhập
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Navbar -->
    <nav
      class="flex justify-center gap-10 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 border-t border-blue-400 text-lg font-semibold"
    >
      <RouterLink
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="relative pb-1 hover:underline transition"
        :class="{ 'border-b-2 border-white': isActive(item.path) }"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

// State
const isLoggedIn = ref(false)
const username = ref('')
const selectedLanguage = ref('vn')
const selectedApp = ref('ios')

// Router
const router = useRouter()
const route = useRoute()

// Menu
const menuItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Lịch trình', path: '/lich-trinh' },
  { label: 'Tra cứu vé', path: '/tra-cuu-ve' },
  { label: 'Tin tức', path: '/tin-tuc' },
  { label: 'Hóa đơn', path: '/hoa-don' },
  { label: 'Liên hệ', path: '/lien-he' },
]

// Xác định menu đang active
const isActive = (path: string) => route.path === path

// Hàm logout
function handleLogout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('fullname')
  delete axios.defaults.headers.common['Authorization']
  username.value = ''
  isLoggedIn.value = false
  router.push('/')
}


// Hàm login
function handleLogin() {
  router.push('/login')
}

// Khi component được mount
onMounted(() => {
  const storedName = localStorage.getItem('fullname')
  if (storedName) {
    username.value = storedName
    isLoggedIn.value = true
  }
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
