<template>
  <div>
    <h2 class="text-xl font-semibold mb-4 text-red-600">Đăng xuất</h2>
    <p>Bạn có chắc chắn muốn đăng xuất không?</p>
    <button @click="logout" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Xác nhận đăng xuất</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('fullname')
  delete axios.defaults.headers.common['Authorization']
  router.push('/')
}
</script>
