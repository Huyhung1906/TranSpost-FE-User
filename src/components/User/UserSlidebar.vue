<template>
  <aside class="w-64 bg-white shadow-md rounded-xl p-5 text-gray-700">
    <nav class="space-y-2">
      <button
        @click="$emit('tab-selected', 'info')"
        :class="buttonClass('info')"
      >
        👤 Thông tin tài khoản
      </button>

      <button
        @click="$emit('tab-selected', 'history')"
        :class="buttonClass('history')"
      >
        📜 Lịch sử mua
      </button>

      <button
        @click="$emit('tab-selected', 'changePassword')"
        :class="buttonClass('changePassword')"
      >
        🔑 Đổi mật khẩu
      </button>

      <button
        @click="logout"
        class="w-full flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition font-semibold"
      >
        🚪 Đăng xuất
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  activeTab: String
})

const router = useRouter()

function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('fullname')
  delete axios.defaults.headers.common['Authorization']
  router.push('/')
}

function buttonClass(tabName) {
  return [
    'w-full flex items-center px-4 py-2 rounded-lg transition font-semibold',
    props.activeTab === tabName
      ? 'bg-blue-100 text-blue-700'
      : 'hover:bg-gray-100 text-gray-700'
  ]
}
</script>
