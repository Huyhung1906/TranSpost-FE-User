<template>
  <section class="bg-blue-50 py-10 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">🎉 Khuyến mãi nổi bật</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="promo in promotions"
          :key="promo.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img :src="promo.image" alt="Promotion" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ promo.title }}</h3>
            <p class="text-sm text-gray-600">{{ promo.description }}</p>
            <p class="text-xs text-gray-500 mt-2">📅 Áp dụng: {{ promo.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const promotions = [
  {
    id: 1,
    title: 'Mua 2 vé tặng 1 vé – Dành cho hành khách đặt online',
    description: 'Đặt vé trực tuyến trên website hoặc app sẽ được tặng 1 vé miễn phí cho mỗi 2 vé cùng chuyến.',
    date: '01/06 - 30/06/2025',
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Giảm 20% khi đặt vé khứ hồi',
    description: 'Ưu đãi đặc biệt cho khách hàng đặt vé khứ hồi, áp dụng tất cả tuyến đường.',
    date: '05/06 - 15/07/2025',
    image: 'https://images.unsplash.com/photo-1581090700227-1e8d61ad5903?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Miễn phí 1 bữa ăn cho chuyến từ 500km trở lên',
    description: 'Hành khách đi các tuyến đường dài từ 500km sẽ được tặng kèm 1 suất ăn miễn phí.',
    date: '01/06 - 31/08/2025',
    image: 'https://images.unsplash.com/photo-1613145991596-74fd6b4a59b1?auto=format&fit=crop&w=800&q=80'
  }
]
</script>

<style scoped>
/* Optional: thêm hiệu ứng khi hover */
</style>
