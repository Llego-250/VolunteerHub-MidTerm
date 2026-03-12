<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Join VolunteerHub</h2>
        <button @click="$emit('close')" class="close-btn"><X :size="24" /></button>
      </div>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="form.name" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" required />
        </div>
        <div class="form-group">
          <label>I want to</label>
          <select v-model="form.role" required>
            <option value="volunteer">Volunteer for events</option>
            <option value="organizer">Organize events</option>
          </select>
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input v-model="form.phone" type="tel" />
        </div>
        <div class="form-group">
          <label>Location</label>
          <input v-model="form.location" placeholder="City, State" />
        </div>
        <button type="submit" class="btn-submit">Create Account</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p class="footer-text">Already have an account? <a @click="switchToLogin">Login here</a></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { X } from 'lucide-vue-next'

const props = defineProps(['defaultRole'])
const emit = defineEmits(['close', 'switchToLogin'])
const authStore = useAuthStore()
const router = useRouter()
const form = ref({ name: '', email: '', password: '', phone: '', location: '', role: 'volunteer' })
const error = ref('')

onMounted(() => {
  if (props.defaultRole) {
    form.value.role = props.defaultRole
  }
})

const handleSignup = () => {
  if (authStore.signup(form.value)) {
    emit('close')
    router.push(form.value.role === 'volunteer' ? '/volunteer-dashboard' : '/organizer-dashboard')
  } else {
    error.value = 'Email already exists'
  }
}

const switchToLogin = () => {
  emit('close')
  emit('switchToLogin')
}
</script>

<style scoped>
.modal { 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%; 
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  display: flex; 
  align-items: center; 
  justify-content: center; 
  z-index: 1000; 
  overflow-y: auto; 
}

.modal-content { 
  background: var(--card-bg);
  padding: 30px; 
  border-radius: 16px; 
  width: 450px; 
  max-width: 90%; 
  margin: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 25px; 
}

.modal-header h2 { 
  font-size: 24px; 
  margin: 0; 
  color: var(--text-primary);
  font-weight: 700;
}

.close-btn { 
  background: none; 
  border: none; 
  color: var(--text-secondary);
  cursor: pointer; 
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover { 
  background: var(--hover-bg);
  color: var(--text-primary);
}

form { 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
}

.form-group { 
  display: flex; 
  flex-direction: column; 
  gap: 6px; 
}

.form-group label { 
  font-weight: 600; 
  color: var(--text-primary);
  font-size: 13px; 
}

.form-group input, 
.form-group select { 
  padding: 10px 12px; 
  border: 2px solid var(--border-color);
  border-radius: 10px; 
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-group select {
  cursor: pointer;
}

.btn-submit { 
  width: 100%; 
  padding: 12px; 
  background: var(--primary-color);
  color: white; 
  border: none; 
  border-radius: 10px; 
  font-size: 15px; 
  font-weight: 600; 
  cursor: pointer; 
  margin-top: 8px;
  transition: all 0.2s ease;
}

.btn-submit:hover { 
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--primary-glow);
}

.error { 
  color: #ef4444; 
  margin: 0; 
  font-size: 14px;
  padding: 10px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.footer-text { 
  text-align: center; 
  color: var(--text-secondary);
  margin: 10px 0 0; 
  font-size: 14px; 
}

.footer-text a { 
  color: var(--primary-color);
  cursor: pointer; 
  text-decoration: none;
  font-weight: 600;
}

.footer-text a:hover { 
  text-decoration: underline; 
}

/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(4px)) {
  .modal {
    background: rgba(0, 0, 0, 0.85);
  }
}
</style>
