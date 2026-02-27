<template>
  <div class="profile-page">
    <Header />
    <div class="container">
      <div class="profile-header">
        <h1>My Profile</h1>
        <button @click="$router.back()" class="btn-back">Back to Dashboard</button>
      </div>
      <div class="profile-container">
        <div class="profile-card">
          <div class="profile-avatar">
            <img src="https://via.placeholder.com/120" alt="Profile" />
            <h3>{{ authStore.currentUser?.name }}</h3>
            <p>{{ authStore.currentUser?.email }}</p>
            <span class="role-badge">{{ authStore.currentUser?.role }}</span>
          </div>
        </div>
        <div class="profile-form">
          <form @submit.prevent="handleUpdate">
            <div class="form-row">
              <div class="form-group">
                <label>Organization Name</label>
                <input v-model="form.name" required />
              </div>
              <div class="form-group">
                <label>Contact Phone</label>
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
              <label>Organization Description</label>
              <textarea v-model="form.description" placeholder="Describe your organization and mission..."></textarea>
            </div>
            <div class="form-group">
              <label>Focus Areas</label>
              <div class="checkbox-grid">
                <label><input type="checkbox" v-model="form.environment" /> Environment</label>
                <label><input type="checkbox" v-model="form.education" /> Education</label>
                <label><input type="checkbox" v-model="form.healthcare" /> Healthcare</label>
                <label><input type="checkbox" v-model="form.community" /> Community</label>
                <label><input type="checkbox" v-model="form.animals" /> Animals</label>
                <label><input type="checkbox" v-model="form.disaster" /> Disaster Relief</label>
                <label><input type="checkbox" v-model="form.elderly" /> Elderly Care</label>
                <label><input type="checkbox" v-model="form.youth" /> Youth Programs</label>
              </div>
            </div>
            <button type="submit" class="btn-update">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import Header from '../components/common/Header.vue'

const authStore = useAuthStore()
const router = useRouter()
const form = ref({ name: '', email: '', phone: '', location: '', website: '', description: '', environment: false, education: false, healthcare: false, community: false, animals: false, disaster: false, elderly: false, youth: false })

onMounted(() => {
  if (authStore.currentUser) {
    form.value = { ...form.value, ...authStore.currentUser }
  }
})

const handleUpdate = () => {
  authStore.updateProfile(form.value)
  alert('Profile updated!')
  router.back()
}
</script>

<style scoped>
.profile-page { min-height: 100vh; background: var(--light-gray); }
.container { max-width: 1400px; margin: 0 auto; padding: 40px 60px; }
.profile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.profile-header h1 { font-size: 32px; }
.btn-back { background: white; color: var(--primary); border: 2px solid var(--primary); }
.profile-container { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
.profile-card { background: linear-gradient(135deg, var(--primary), #34d399); padding: 40px; border-radius: 12px; text-align: center; color: white; height: fit-content; }
.profile-avatar img { width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; margin-bottom: 20px; }
.profile-avatar h3 { margin: 10px 0; font-size: 24px; }
.profile-avatar p { margin: 5px 0 15px; opacity: 0.9; }
.role-badge { background: rgba(255,255,255,0.3); padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; text-transform: capitalize; }
.profile-form { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
textarea { min-height: 100px; resize: vertical; }
.checkbox-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
.checkbox-grid label { display: flex; align-items: center; gap: 8px; font-weight: normal; }
.checkbox-grid input[type="checkbox"] { width: auto; }
.btn-update { width: 100%; margin-top: 10px; padding: 12px; }
</style>
