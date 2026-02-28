<template>
  <div class="profile-settings">
    <div class="profile-container">
      <div class="profile-card">
        <div class="avatar-large">{{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}</div>
        <h3>{{ authStore.currentUser?.name }}</h3>
        <p>{{ authStore.currentUser?.email }}</p>
        <span class="role-badge">{{ authStore.currentUser?.role }}</span>
      </div>
      <div class="profile-form">
        <h2>Edit Profile</h2>
        <form @submit.prevent="handleUpdate">
          <div class="form-row">
            <div class="form-group">
              <label>Name</label>
              <input v-model="form.name" required />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input v-model="form.phone" />
            </div>
          </div>
          <div class="form-group">
            <label>Location</label>
            <input v-model="form.location" />
          </div>
          <div class="form-group">
            <label>Website</label>
            <input v-model="form.website" placeholder="https://" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="form.description" placeholder="Describe yourself..."></textarea>
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const form = ref({ name: '', email: '', phone: '', location: '', website: '', description: '' })

onMounted(() => {
  if (authStore.currentUser) {
    form.value = { ...form.value, ...authStore.currentUser }
  }
})

const handleUpdate = () => {
  authStore.updateProfile(form.value)
  alert('Profile updated!')
}
</script>

<style scoped>
.profile-settings { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.profile-container { display: grid; grid-template-columns: 250px 1fr; gap: 30px; }
.profile-card { text-align: center; padding: 20px; background: linear-gradient(135deg, var(--primary), #34d399); border-radius: 12px; color: white; }
.avatar-large { width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; margin: 0 auto 15px; background: rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: 600; }
.profile-card h3 { margin: 10px 0; font-size: 20px; }
.profile-card p { margin: 5px 0 15px; opacity: 0.9; font-size: 14px; }
.role-badge { background: rgba(255,255,255,0.3); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: capitalize; }
.profile-form h2 { margin-bottom: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 500; }
textarea { min-height: 80px; resize: vertical; }
</style>
