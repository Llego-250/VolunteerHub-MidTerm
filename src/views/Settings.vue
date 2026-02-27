<template>
  <div class="settings">
    <h1>Settings</h1>
    <div class="setting-group">
      <h3>Notifications</h3>
      <label><input type="checkbox" v-model="settings.emailNotifications" /> Email Notifications</label>
      <label><input type="checkbox" v-model="settings.smsNotifications" /> SMS Notifications</label>
    </div>
    <div class="setting-group">
      <h3>Privacy</h3>
      <label><input type="checkbox" v-model="settings.profilePublic" /> Public Profile</label>
    </div>
    <button @click="handleSave">Save Settings</button>
    <button @click="handleDeleteAccount" class="danger">Delete Account</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  profilePublic: true
})

const handleSave = () => {
  alert('Settings saved!')
}

const handleDeleteAccount = () => {
  if (confirm('Are you sure you want to delete your account?')) {
    authStore.logout()
    router.push('/')
  }
}
</script>

<style scoped>
.settings { padding: 40px; max-width: 600px; margin: 0 auto; }
.setting-group { margin: 30px 0; }
label { display: block; margin: 10px 0; }
button { padding: 10px 20px; margin: 10px 10px 10px 0; }
.danger { background: #dc3545; color: white; }
</style>
