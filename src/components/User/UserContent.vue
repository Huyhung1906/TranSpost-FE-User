<template>
  <section class="flex-1 bg-white rounded-xl shadow-md p-6 ml-4">
    <AccountInfo v-if="activeTab === 'info'" />
    <PurchaseHistory v-else-if="activeTab === 'history'" />
    <ChangePassword v-else-if="activeTab === 'changePassword'" />
    <LogoutConfirmation v-else />
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
import AccountInfo from './tabs/AccountInfo.vue'
import PurchaseHistory from './tabs/PurchaseHistory.vue'
import ChangePassword from './tabs/ChangePassword.vue'
import LogoutConfirmation from './tabs/LogoutConfirm.vue'

defineProps({
  activeTab: String,
})
</script>
