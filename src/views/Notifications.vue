<template>
  <div class="notifications">
    <h1>Notifications</h1>
    <div v-if="notifications.length === 0">No notifications</div>
    <div v-for="notif in notifications" :key="notif.id" class="notification">
      <p>{{ notif.message }}</p>
      <small>{{ notif.date }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
  { id: 1, message: 'You registered for Beach Cleanup Drive', date: '2 hours ago' },
  { id: 2, message: 'New event matching your interests', date: '1 day ago' }
])
</script>

<style scoped>
.notifications { padding: 40px; max-width: 800px; margin: 0 auto; }
.notification { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
</style>
