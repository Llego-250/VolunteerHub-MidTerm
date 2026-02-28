<template>
  <div class="notifications-panel">
    <h2>Notifications</h2>
    <div v-if="notifications.length === 0" class="empty">No notifications</div>
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
.notifications-panel { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
h2 { margin-bottom: 20px; }
.empty { color: var(--gray); text-align: center; padding: 20px; }
.notification { border: 1px solid var(--border); padding: 15px; margin: 10px 0; border-radius: 8px; }
.notification p { margin-bottom: 8px; }
.notification small { color: var(--gray); }
</style>
