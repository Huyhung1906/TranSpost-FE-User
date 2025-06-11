<template>
  <div>
    <!-- Nút mở khung chat -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
        @click="toggleChat"
        class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-200"
        aria-label="Open Chat"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Khung chat -->
    <transition name="slide-up">
      <div
        v-if="showChat"
        class="fixed bottom-28 right-6 w-80 max-h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
          <div class="font-semibold text-sm">Trò chuyện cùng chúng tôi</div>
          <button @click="toggleChat" class="hover:text-gray-300 text-lg">&times;</button>
        </div>

        <!-- Nội dung tin nhắn -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-gray-50" ref="chatContainer">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="flex flex-col"
            :class="{ 'items-end': msg.sender === 'user' }"
          >
            <div
              :class="msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800' "
              class="px-3 py-2 rounded-lg max-w-[75%]"
            >
              {{ msg.text }}
            </div>
          </div>

          <!-- Loader -->
          <div v-if="loading" class="flex items-center space-x-2 text-gray-500 text-sm">
            <span class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
            <span class="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></span>
            <span class="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300"></span>
            <span>Đang phản hồi...</span>
          </div>
        </div>

        <!-- Input gửi tin nhắn -->
        <div class="p-3 border-t bg-white flex gap-2">
          <input
            v-model="message"
            @keyup.enter="sendMessage"
            type="text"
            class="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập tin nhắn..."
            :disabled="loading"
          />
          <button
            @click="sendMessage"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
            :disabled="loading"
          >
            Gửi
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'

const showChat = ref(false)
const message = ref('')
const loading = ref(false)
const messages = ref([
  { text: 'Xin chào! Bạn cần hỗ trợ điều gì?', sender: 'bot' }
])
const chatContainer = ref(null)
const apiUrl = import.meta.env.VITE_API_URL

function toggleChat() {
  showChat.value = !showChat.value
  nextTick(scrollToBottom)
}

async function sendMessage() {
  const trimmed = message.value.trim()
  if (!trimmed) return

  messages.value.push({ text: trimmed, sender: 'user' })
  message.value = ''
  loading.value = true
  scrollToBottom()
  console.log("Gửi câu hỏi:", trimmed)

  try {
    const res = await axios.post(`${apiUrl}/chatbox/`, { question: trimmed }, { headers: { 'Content-Type': 'application/json' } });
    const answer = res.data?.answer || 'Xin lỗi, không thể hiểu câu hỏi của bạn.';
    messages.value.push({ text: answer, sender: 'bot' });
  } catch (error) {
    if (error.response?.data?.answer) {
      // Nếu backend trả câu trả lời kèm trong lỗi 400
      messages.value.push({ text: error.response.data.answer, sender: 'bot' });
    } else {
      messages.value.push({
        text: 'Lỗi khi kết nối đến hệ thống. Vui lòng thử lại sau.',
        sender: 'bot'
      });
    }
  } finally {
    loading.value = false
    nextTick(scrollToBottom)
  }
}

function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}
.animate-bounce {
  animation: bounce 0.6s infinite;
}
.delay-150 {
  animation-delay: 0.15s;
}
.delay-300 {
  animation-delay: 0.3s;
}
</style>
