<template>
  <div class="notifications-panel">
    <div class="notifications-header">
      <h2>Notifications</h2>
      <div class="header-actions">
        <button 
          v-if="unreadCount > 0" 
          @click="markAllAsRead" 
          class="btn-mark-read"
          title="Mark all as read"
        >
          <i class="fas fa-check-double"></i> Mark all read
        </button>
        <button 
          v-if="notifications.length > 0" 
          @click="clearAll" 
          class="btn-clear"
          title="Clear all notifications"
        >
          <i class="fas fa-trash"></i> Clear all
        </button>
      </div>
    </div>
    
    <div v-if="notifications.length === 0" class="empty">
      <i class="fas fa-bell-slash"></i>
      <p>No notifications yet</p>
      <small>You'll see notifications here when organizers send messages or create new events</small>
    </div>
    
    <div v-else class="notifications-list">
      <div 
        v-for="notif in notifications" 
        :key="notif.id" 
        class="notification"
        :class="{ 'unread': !notif.read, 'clickable': notif.clickable }"
        @click="handleNotificationClick(notif)"
      >
        <div class="notification-icon" :class="`icon-${notif.type}`">
          <i :class="getIcon(notif.type)"></i>
        </div>
        
        <div class="notification-content">
          <h4>{{ notif.title }}</h4>
          <p>{{ notif.message }}</p>
          <div class="notification-meta">
            <small>{{ formatDate(notif.createdAt) }}</small>
            <span v-if="notif.from" class="from-badge">
              <i class="fas fa-user"></i> {{ notif.from }}
            </span>
          </div>
        </div>
        
        <div class="notification-actions">
          <button 
            v-if="!notif.read" 
            @click.stop="markAsRead(notif.id)" 
            class="btn-read"
            title="Mark as read"
          >
            <i class="fas fa-check"></i>
          </button>
          <button 
            @click.stop="deleteNotification(notif.id)" 
            class="btn-delete"
            title="Delete"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useNotificationsStore } from '../../stores/notifications'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const router = useRouter()

const notifications = computed(() => 
  notificationsStore.getUserNotifications(authStore.currentUser?.id)
)

const unreadCount = computed(() => 
  notificationsStore.getUnreadCount(authStore.currentUser?.id)
)

const getIcon = (type) => {
  const icons = {
    'message': 'fas fa-envelope',
    'new_event': 'fas fa-calendar-plus',
    'reminder': 'fas fa-bell',
    'update': 'fas fa-info-circle'
  }
  return icons[type] || 'fas fa-bell'
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const handleNotificationClick = (notif) => {
  // Mark as read
  if (!notif.read) {
    notificationsStore.markAsRead(notif.id)
  }
  
  // Navigate to event if clickable
  if (notif.clickable && notif.eventId) {
    router.push('/events')
  }
}

const markAsRead = (id) => {
  notificationsStore.markAsRead(id)
}

const markAllAsRead = () => {
  notificationsStore.markAllAsRead(authStore.currentUser?.id)
}

const deleteNotification = (id) => {
  notificationsStore.deleteNotification(id)
}

const clearAll = () => {
  if (confirm('Are you sure you want to clear all notifications?')) {
    notificationsStore.clearAllNotifications(authStore.currentUser?.id)
  }
}
</script>

<style scoped>
.notifications-panel { 
  background: white; 
  padding: 30px; 
  border-radius: 12px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 900px;
  transition: all 0.3s ease;
}

.dark-theme .notifications-panel {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

h2 { 
  margin: 0;
  color: var(--text-primary, #1f2937);
  transition: color 0.3s ease;
}

.dark-theme h2 {
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-mark-read,
.btn-clear {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.btn-mark-read {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.btn-mark-read:hover {
  background: rgba(16, 185, 129, 0.2);
}

.btn-clear {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.btn-clear:hover {
  background: rgba(239, 68, 68, 0.2);
}

.empty { 
  text-align: center; 
  padding: 60px 20px;
  color: var(--text-muted, #9ca3af);
}

.empty i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty p {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0 8px 0;
  color: var(--text-secondary, #6b7280);
}

.empty small {
  font-size: 14px;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification { 
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid var(--border-color, #e5e7eb); 
  padding: 16px; 
  border-radius: 12px;
  transition: all 0.2s ease;
  background: var(--bg-card, white);
}

.dark-theme .notification {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.2);
}

.notification.unread {
  background: rgba(16, 185, 129, 0.05);
  border-color: #10b981;
  border-left-width: 4px;
}

.dark-theme .notification.unread {
  background: rgba(16, 185, 129, 0.12);
  border-color: #34d399;
}

.notification.clickable {
  cursor: pointer;
}

.notification.clickable:hover {
  background: rgba(16, 185, 129, 0.08);
  border-color: #10b981;
  transform: translateX(4px);
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
}

.icon-message {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.icon-new_event {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.icon-reminder {
  background: rgba(251, 191, 36, 0.1);
  color: #f59e0b;
}

.notification-content {
  flex: 1;
}

.notification-content h4 {
  margin: 0 0 6px 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary, #1f2937);
}

.dark-theme .notification-content h4 {
  color: #ffffff;
}

.notification-content p { 
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--text-secondary, #6b7280);
  line-height: 1.5;
}

.dark-theme .notification-content p {
  color: #d1d5db;
}

.notification-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.notification-meta small { 
  color: var(--text-muted, #9ca3af);
  font-size: 12px;
}

.from-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 4px;
  font-size: 12px;
  color: #059669;
  font-weight: 500;
}

.notification-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.btn-read,
.btn-delete {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn-read {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.btn-read:hover {
  background: rgba(16, 185, 129, 0.2);
}

.btn-delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .notifications-panel {
    padding: 20px;
  }
  
  .notifications-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .notification {
    padding: 12px;
  }
  
  .notification-icon {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}
</style>
