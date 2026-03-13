<template>
  <div class="modal" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <div class="modal-content" role="dialog" aria-labelledby="login-title" aria-modal="true">
      <div class="modal-header">
        <h2 id="login-title">Login to VolunteerHub</h2>
        <button 
          @click="$emit('close')" 
          class="close-btn" 
          aria-label="Close login modal"
          tabindex="0"
        >
          <X :size="24" />
        </button>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input 
            id="login-email"
            ref="emailInput"
            v-model="form.email" 
            type="email" 
            required 
            tabindex="0"
            autocomplete="email"
            aria-required="true"
          />
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input 
            id="login-password"
            v-model="form.password" 
            type="password" 
            required 
            tabindex="0"
            autocomplete="current-password"
            aria-required="true"
          />
        </div>
        <div class="form-group">
          <label id="role-label">Login as:</label>
          <div class="radio-group" role="radiogroup" aria-labelledby="role-label">
            <label class="radio-label">
              <input 
                type="radio" 
                v-model="form.role" 
                value="volunteer" 
                required 
                tabindex="0"
                aria-label="Login as volunteer"
              />
              <span>Volunteer</span>
            </label>
            <label class="radio-label">
              <input 
                type="radio" 
                v-model="form.role" 
                value="organizer" 
                required 
                tabindex="0"
                aria-label="Login as organizer"
              />
              <span>Organizer</span>
            </label>
          </div>
        </div>
        <button 
          type="submit" 
          class="btn-submit" 
          tabindex="0"
          :disabled="!form.email || !form.password"
        >
          Login
        </button>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <p class="footer-text">
          Don't have an account? 
          <a 
            @click="switchToSignup" 
            @keydown.enter="switchToSignup"
            @keydown.space.prevent="switchToSignup"
            tabindex="0"
            role="button"
          >
            Sign up here
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { X } from 'lucide-vue-next'

const emit = defineEmits(['close', 'switchToSignup'])
const authStore = useAuthStore()
const router = useRouter()
const form = ref({ email: '', password: '', role: 'volunteer' })
const error = ref('')
const emailInput = ref(null)

// Focus management
onMounted(() => {
  // Focus the email input when modal opens
  setTimeout(() => {
    emailInput.value?.focus()
  }, 100)
  
  // Trap focus within modal
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (e) => {
  // Handle Escape key
  if (e.key === 'Escape') {
    emit('close')
  }
  
  // Trap Tab key within modal
  if (e.key === 'Tab') {
    const modal = document.querySelector('.modal-content')
    if (!modal) return
    
    const focusableElements = modal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }
}

const handleLogin = () => {
  error.value = ''
  
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

.close-btn:hover,
.close-btn:focus { 
  background: var(--hover-bg);
  color: var(--text-primary);
  outline: none;
}

.close-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
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

.form-group input:focus-visible {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.radio-label input[type="radio"]:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
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

.btn-submit:hover,
.btn-submit:focus { 
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--primary-glow);
  outline: none;
}

.btn-submit:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-submit:disabled:hover {
  background: var(--primary-color);
  box-shadow: none;
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
  border-radius: 4px;
  padding: 2px 4px;
  transition: all 0.2s ease;
}

.footer-text a:hover,
.footer-text a:focus { 
  text-decoration: underline;
  outline: none;
}

.footer-text a:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(4px)) {
  .modal {
    background: rgba(0, 0, 0, 0.85);
  }
}
</style>
