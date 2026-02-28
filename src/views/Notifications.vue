<template>
  <div class="notifications">
    <Navbar />
    <div class="container">
      <h1>Notifications</h1>
      <div v-if="notifications.length === 0">No notifications</div>
      <div v-for="notif in notifications" :key="notif.id" class="notification">
      <p>{{ notif.message }}</p>
      <small>{{ notif.date }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/common/Navbar.vue'

const notifications = ref([
  { id: 1, message: 'You registered for Beach Cleanup Drive', date: '2 hours ago' },
  { id: 2, message: 'New event matching your interests', date: '1 day ago' }
])
</script>

<style scoped>
.notifications { min-height: 100vh; background: var(--light-gray); padding-top: 80px; }
.container { padding: 40px; max-width: 800px; margin: 0 auto; }
.notification { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
</style>
