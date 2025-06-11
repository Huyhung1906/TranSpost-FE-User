<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Đổi mật khẩu</h2>
    <form @submit.prevent="changePassword">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Mật khẩu cũ</label>
        <input v-model="oldPassword" type="password" class="input" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Mật khẩu mới</label>
        <input v-model="newPassword" type="password" class="input" />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Đổi mật khẩu</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const oldPassword = ref('')
const newPassword = ref('')

function changePassword() {
  console.log('Đổi mật khẩu:', oldPassword.value, newPassword.value)
}
</script>
