<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full w-full">
      <!-- Gọi LoginForm -->
      <LoginForm @login="handleLogin" @register="handleRegister" />
    </div>
  </div>
</template>
<script setup>
import LoginForm from '@/components/LoginForm.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const handleLogin = async ({ username, password }) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login/`, {
      username,
      password
    })

    const { access_token, user } = res.data.data
    const { fullname, id } = user

    localStorage.setItem('access_token', access_token)
    localStorage.setItem('fullname', fullname)
    localStorage.setItem('id', id)
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

    router.push('/')
    toast.success('Đăng nhập thành công!')
  } catch (err) {
    console.error(err)
    toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
  }
}

const handleRegister = async ({ username, fullname, email, phone, password, role }) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/user/register/`, {
      username,
      fullname,
      email,
      phone,
      password,
      role
    })

    toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
    router.push('/login')

  } catch (err) {
    console.error(err)
    toast.error('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.')
  }
}
</script>
