<template>
  <div class="profile-settings">
    <div class="profile-sidebar">
      <button @click="activeSection = 'profile'" :class="{ active: activeSection === 'profile' }">
        <i class="fas fa-user"></i> Profile
      </button>
      <button @click="activeSection = 'settings'" :class="{ active: activeSection === 'settings' }">
        <i class="fas fa-cog"></i> Settings
      </button>
    </div>
    <div class="profile-content">
      <div v-if="activeSection === 'profile'" class="profile-container">
        <div class="profile-card">
          <div class="avatar-large" :style="authStore.currentUser?.profilePicture ? `background-image: url(${authStore.currentUser.profilePicture})` : ''">
            <span v-if="!authStore.currentUser?.profilePicture">{{ authStore.currentUser?.name?.charAt(0).toUpperCase() }}</span>
          </div>
          <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none" />
          <button @click="$refs.fileInput.click()" class="upload-btn">Change Photo</button>
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
      <div v-else class="settings-section">
        <h2>Settings</h2>
        <div class="setting-group">
          <h3>Notifications</h3>
          <label><input type="checkbox" v-model="settings.emailNotifications" /> Email Notifications</label>
          <label><input type="checkbox" v-model="settings.smsNotifications" /> SMS Notifications</label>
        </div>
        <div class="setting-group">
          <h3>Privacy</h3>
          <label><input type="checkbox" v-model="settings.profilePublic" /> Public Profile</label>
        </div>
        <button @click="handleSaveSettings">Save Settings</button>
        <button @click="handleDeleteAccount" class="danger">Delete Account</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const activeSection = ref('profile')
const form = ref({ name: '', email: '', phone: '', location: '', website: '', description: '' })
const settings = ref({ emailNotifications: true, smsNotifications: false, profilePublic: true })

onMounted(() => {
  if (authStore.currentUser) {
    form.value = { ...form.value, ...authStore.currentUser }
  }
})

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      authStore.updateProfile({ profilePicture: event.target.result })
    }
    reader.readAsDataURL(file)
  }
}

const handleUpdate = () => {
  authStore.updateProfile(form.value)
  alert('Profile updated!')
}

const handleSaveSettings = () => {
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
.profile-settings { display: flex; flex-direction: column; gap: 20px; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.profile-sidebar { display: flex; flex-direction: row; gap: 10px; margin-bottom: 20px; }
.profile-sidebar button { padding: 12px 20px; background: white; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.3s; }
.profile-sidebar button:hover { background: var(--light-gray); }
.profile-sidebar button.active { background: var(--primary); color: white; border-color: var(--primary); }
.profile-sidebar button i { width: 20px; }
.profile-content { flex: 1; }
.profile-container { display: grid; grid-template-columns: 250px 1fr; gap: 30px; }
.profile-card { text-align: center; padding: 20px; background: linear-gradient(135deg, var(--primary), #34d399); border-radius: 12px; color: white; }
.avatar-large { width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; margin: 0 auto 15px; background: rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: 600; background-size: cover; background-position: center; }
.upload-btn { background: rgba(255,255,255,0.3); border: 1px solid white; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-bottom: 10px; }
.upload-btn:hover { background: rgba(255,255,255,0.5); }
.profile-card h3 { margin: 10px 0; font-size: 20px; }
.profile-card p { margin: 5px 0 15px; opacity: 0.9; font-size: 14px; }
.role-badge { background: rgba(255,255,255,0.3); padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: capitalize; }
.profile-form h2 { margin-bottom: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 500; }
textarea { min-height: 80px; resize: vertical; }
.settings-section h2 { margin-bottom: 20px; }
.setting-group { margin: 25px 0; }
.setting-group h3 { font-size: 18px; margin-bottom: 15px; }
.settings-section label { display: block; margin: 10px 0; }
.settings-section button { padding: 10px 20px; margin: 10px 10px 10px 0; }
.danger { background: #dc3545; color: white; }
</style>
