<template>
  <section class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
      <!-- Bên trái: Nội dung thống kê -->
      <div class="md:w-1/2 space-y-8">
        <h2 class="text-green-700 text-2xl font-bold uppercase">HHC BUS LINES - CHẤT LƯỢNG LÀ DANH DỰ</h2>
        <p class="text-gray-600">Được khách hàng tin tưởng và lựa chọn</p>

        <div class="space-y-6">
          <!-- Item 1 -->
          <div class="flex items-start gap-4">
            <img src="@/assets/img/customer.jpg" alt="Lượt khách" class="w-14 h-14" />
            <div>
              <p class="font-bold text-lg">Hơn <span class="text-rose-600">40 Triệu</span> <span class="font-medium">Lượt khách</span></p>
              <p class="text-gray-600 text-sm">HUY HƯNG phục vụ hơn 40 triệu lượt khách bình quân 1 năm trên toàn quốc</p>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="flex items-start gap-4">
            <img src="@/assets/img/location.png" alt="Phòng vé" class="w-14 h-14" />
            <div>
              <p class="font-bold text-lg">Hơn <span class="text-rose-600">350</span> <span class="font-medium">Phòng vé - Bưu cục</span></p>
              <p class="text-gray-600 text-sm">HUY HƯNG có hơn 350 phòng vé, trạm trung chuyển, bến xe,... trên toàn hệ thống</p>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="flex items-start gap-4">
            <img src="@/assets/img/bus.jpg" alt="Chuyến xe" class="w-14 h-14" />
            <div>
              <p class="font-bold text-lg">Hơn <span class="text-rose-600">6,500</span> <span class="font-medium">Chuyến xe</span></p>
              <p class="text-gray-600 text-sm">HUY HƯNG phục vụ hơn 6,500 chuyến xe đường dài và liên tỉnh mỗi ngày</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bên phải: Hình minh họa -->
      <div class="md:w-1/2 flex justify-center">
        <img
          src="@/assets/img/banner2.webp"
          alt="Hình minh họa khách hàng"
          class="w-full max-w-md"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
// Không cần script nếu chỉ render tĩnh
</script>

<style scoped>
/* Không cần style riêng nếu dùng Tailwind */
</style>
