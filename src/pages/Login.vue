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

const router = useRouter()

const handleLogin = async ({ username, password }) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login/`, {
      username,
      password
    })

    const { access_token, user } = res.data.data
    const { fullname } = user

    localStorage.setItem('access_token', access_token)
    localStorage.setItem('fullname', fullname)
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

    router.push('/')
    alert('Đăng nhập thành công!')
  } catch (err) {
    console.error(err)
    alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.')
  }
}

const handleRegister = async ({ username, fullname, email, phone, password, role }) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register/`, {
      username,
      fullname,
      email,
      phone,
      password,
      role
    })

    alert('Đăng ký thành công! Vui lòng đăng nhập.')
    // Chuyển sang chế độ login sau khi đăng ký thành công
    router.push('/login') // hoặc nếu đang ở trang này thì bạn có thể gọi toggleMode từ component con qua event emit, hoặc tự xử lý ở component cha

  } catch (err) {
    console.error(err)
    alert('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.')
  }
}
</script>
