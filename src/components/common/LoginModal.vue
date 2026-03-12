<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Login to VolunteerHub</h2>
        <button @click="$emit('close')" class="close-btn"><X :size="24" /></button>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" required />
        </div>
        <div class="form-group">
          <label>Login as:</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="form.role" value="volunteer" required />
              <span>Volunteer</span>
            </label>
            <label class="radio-label">
              <input type="radio" v-model="form.role" value="organizer" required />
              <span>Organizer</span>
            </label>
          </div>
        </div>
        <button type="submit" class="btn-submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p class="footer-text">Don't have an account? <a @click="switchToSignup">Sign up here</a></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { X } from 'lucide-vue-next'

const emit = defineEmits(['close', 'switchToSignup'])
const authStore = useAuthStore()
const router = useRouter()
const form = ref({ email: '', password: '', role: 'volunteer' })
const error = ref('')

const handleLogin = () => {
  if (authStore.login(form.value.email, form.value.password)) {
    if (authStore.currentUser.role === form.value.role) {
      emit('close')
      router.push(form.value.role === 'volunteer' ? '/volunteer-dashboard' : '/organizer-dashboard')
    } else {
      error.value = 'Role mismatch'
    }
  } else {
    error.value = 'Invalid credentials'
  }
}

const switchToSignup = () => {
  emit('close')
  emit('switchToSignup')
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
}

.modal-content { 
  background: var(--card-bg);
  padding: 40px; 
  border-radius: 16px; 
  width: 500px; 
  max-width: 90%;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 30px; 
}

.modal-header h2 { 
  font-size: 28px; 
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
  gap: 20px; 
}

.form-group { 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
}

.form-group label { 
  font-weight: 600; 
  color: var(--text-primary);
  font-size: 14px; 
}

.form-group input[type="email"], 
.form-group input[type="password"] { 
  padding: 12px 15px; 
  border: 2px solid var(--border-color);
  border-radius: 10px; 
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.radio-group { 
  display: flex; 
  gap: 30px; 
  padding: 10px 0; 
}

.radio-label { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  cursor: pointer; 
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
}

.radio-label input[type="radio"] { 
  width: 18px; 
  height: 18px; 
  cursor: pointer; 
  accent-color: var(--primary-color);
}

.btn-submit { 
  width: 100%; 
  padding: 14px; 
  background: var(--primary-color);
  color: white; 
  border: none; 
  border-radius: 10px; 
  font-size: 16px; 
  font-weight: 600; 
  cursor: pointer; 
  margin-top: 10px;
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
