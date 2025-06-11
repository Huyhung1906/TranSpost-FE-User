<template>
  <div
    class="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center px-4"
  >
    <div
      class="bg-white rounded-xl shadow-xl max-w-5xl w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      aria-live="polite"
    >
      <!-- Left side: form -->
      <div class="flex flex-col justify-center">
        <h2
          class="text-3xl font-extrabold text-gray-900 mb-6 text-center md:text-left tracking-wide"
        >
          {{ isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản' }}
        </h2>
        <form @submit.prevent="onSubmit" class="space-y-6">
          <div
            v-if="!isLogin"
            class="grid grid-cols-2 gap-6"
          >
            <!-- fullname + username side by side -->
            <div>
              <label
                for="fullname"
                class="block text-sm font-semibold text-gray-700 mb-1"
                >Họ và tên</label
              >
              <input
                id="fullname"
                type="text"
                v-model="fullname"
                placeholder="Nhập họ và tên"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label
                for="username"
                class="block text-sm font-semibold text-gray-700 mb-1"
                >Tên đăng nhập</label
              >
              <input
                id="username"
                type="text"
                v-model="username"
                placeholder="Nhập tên đăng nhập"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div v-if="isLogin">
            <label
              for="username-login"
              class="block text-sm font-semibold text-gray-700 mb-1"
              >Tên đăng nhập</label
            >
            <input
              id="username-login"
              type="text"
              v-model="username"
              placeholder="Nhập tên đăng nhập"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div
            v-if="!isLogin"
            class="grid grid-cols-2 gap-6"
          >
            <!-- email + phone side by side -->
            <div>
              <label
                for="email"
                class="block text-sm font-semibold text-gray-700 mb-1"
                >Email</label
              >
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Nhập email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label
                for="phone"
                class="block text-sm font-semibold text-gray-700 mb-1"
                >Số điện thoại</label
              >
              <input
                id="phone"
                type="tel"
                v-model="phone"
                placeholder="Nhập số điện thoại"
                pattern="[0-9]{6,15}"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-semibold text-gray-700 mb-1"
              >Mật khẩu</label
            >
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Nhập mật khẩu"
              minlength="6"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div v-if="!isLogin">
            <label
              for="passwordConfirm"
              class="block text-sm font-semibold text-gray-700 mb-1"
              >Xác nhận mật khẩu</label
            >
            <input
              id="passwordConfirm"
              type="password"
              v-model="passwordConfirm"
              placeholder="Nhập lại mật khẩu"
              minlength="6"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div v-if="errorMessage" class="text-red-600 text-center text-sm">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-lg transition-colors"
          >
            {{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}
          </button>
        </form>

        <div class="mt-6">
          <p class="text-center text-gray-600 font-medium select-none mb-4">
            {{ isLogin ? 'Hoặc đăng nhập bằng' : 'Đăng ký bằng' }}
          </p>
          <div class="flex justify-center space-x-4">
            <button
              @click="onSocialLogin('facebook')"
              class="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white transition text-blue-600 font-semibold"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.243 0-1.63.772-1.63 1.563v1.875h2.773l-.443 2.89h-2.33v6.987C18.344 21.128 22 16.99 22 12z"
                />
              </svg>
              <span>Facebook</span>
            </button>

            <button
              @click="onSocialLogin('google')"
              class="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-red-600 hover:text-white transition text-red-600 font-semibold"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.805 10.023H12v3.954h5.283c-.231 1.426-1.568 4.184-5.283 4.184-3.186 0-5.79-2.639-5.79-5.888 0-3.249 2.603-5.889 5.79-5.889 1.81 0 3.029.77 3.73 1.435l2.544-2.453C16.957 6.029 14.75 5 12 5 6.477 5 2 9.582 2 15.222c0 5.64 4.477 10.222 10 10.222 5.752 0 9.576-4.035 9.576-9.708 0-.66-.07-1.183-.14-1.713z"
                  fill="currentColor"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>

        <p
          v-if="isLogin"
          class="mt-6 text-center md:text-left text-gray-600 font-medium select-none"
        >
          <button
            @click="onForgotPassword"
            type="button"
            class="text-indigo-600 font-bold hover:underline focus:outline-none"
          >
            Quên mật khẩu?
          </button>
        </p>

        <p
          class="mt-6 text-center md:text-left text-gray-600 font-medium select-none"
        >
          {{ isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}
          <button
            @click="toggleMode"
            type="button"
            class="text-indigo-600 font-bold hover:underline ml-1 focus:outline-none"
          >
            {{ isLogin ? 'Đăng ký ngay' : 'Đăng nhập' }}
          </button>
        </p>
      </div>

      <!-- Right side: banner image -->
      <div class="hidden md:flex items-center justify-center">
        <img
          src="@/assets/img/banner1.png"
          alt="Banner đăng ký"
          class="rounded-xl shadow-lg object-cover max-h-[450px] w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login', 'register', 'social-login', 'forgot-password'])

const isLogin = ref(true)

const username = ref('')
const fullname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref('')

const resetFields = () => {
  username.value = ''
  fullname.value = ''
  email.value = ''
  phone.value = ''
  password.value = ''
  passwordConfirm.value = ''
  errorMessage.value = ''
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
  resetFields()
}

const onSubmit = () => {
  errorMessage.value = ''

  if (!username.value || !password.value || (!isLogin.value && (!fullname.value || !email.value || !phone.value))) {
    errorMessage.value = 'Vui lòng nhập đầy đủ thông tin'
    return
  }

  if (!isLogin.value && password.value !== passwordConfirm.value) {
    errorMessage.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  phone.value = phone.value.replace(/\s+/g, '')

  if (isLogin.value) {
    emit('login', {
      username: username.value,
      password: password.value
    })
  } else {
    emit('register', {
      username: username.value,
      fullname: fullname.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
      role: 1
    })
  }
}

const onSocialLogin = (provider) => {
  emit('social-login', provider)
}

const onForgotPassword = () => {
  emit('forgot-password')
}
</script>
