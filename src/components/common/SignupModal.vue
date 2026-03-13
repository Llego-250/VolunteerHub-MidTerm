<template>
  <div class="modal" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <div class="modal-content" role="dialog" aria-labelledby="signup-title" aria-modal="true">
      <div class="modal-header">
        <h2 id="signup-title">Join VolunteerHub</h2>
        <button 
          @click="$emit('close')" 
          class="close-btn"
          aria-label="Close signup modal"
          tabindex="0"
        >
          <X :size="24" />
        </button>
      </div>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="signup-name">Full Name</label>
          <input 
            id="signup-name"
            ref="nameInput"
            v-model="form.name" 
            required 
            tabindex="0"
            autocomplete="name"
            aria-required="true"
          />
        </div>
        <div class="form-group">
          <label for="signup-email">Email</label>
          <input 
            id="signup-email"
            v-model="form.email" 
            type="email" 
            required 
            tabindex="0"
            autocomplete="email"
            aria-required="true"
          />
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <input 
            id="signup-password"
            v-model="form.password" 
            type="password" 
            required 
            tabindex="0"
            autocomplete="new-password"
            aria-required="true"
          />
        </div>
        <div class="form-group">
          <label for="signup-role">I want to</label>
          <select 
            id="signup-role"
            v-model="form.role" 
            required 
            tabindex="0"
            aria-required="true"
          >
            <option value="volunteer">Volunteer for events</option>
            <option value="organizer">Organize events</option>
          </select>
        </div>
        <div class="form-group">
          <label for="signup-phone">Phone Number</label>
          <input 
            id="signup-phone"
            v-model="form.phone" 
            type="tel" 
            tabindex="0"
            autocomplete="tel"
          />
        </div>
        <div class="form-group">
          <label for="signup-location">Location</label>
          <input 
            id="signup-location"
            v-model="form.location" 
            placeholder="City, State" 
            tabindex="0"
            autocomplete="address-level2"
          />
        </div>
        <button 
          type="submit" 
          class="btn-submit" 
          tabindex="0"
          :disabled="!form.name || !form.email || !form.password"
        >
          Create Account
        </button>
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <p class="footer-text">
          Already have an account? 
          <a 
            @click="switchToLogin"
            @keydown.enter="switchToLogin"
            @keydown.space.prevent="switchToLogin"
            tabindex="0"
            role="button"
          >
            Login here
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

const props = defineProps(['defaultRole'])
const emit = defineEmits(['close', 'switchToLogin'])
const authStore = useAuthStore()
const router = useRouter()
const form = ref({ name: '', email: '', password: '', phone: '', location: '', role: 'volunteer' })
const error = ref('')
const nameInput = ref(null)

onMounted(() => {
  if (props.defaultRole) {
    form.value.role = props.defaultRole
  }
  
  // Focus the name input when modal opens
  setTimeout(() => {
    nameInput.value?.focus()
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
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

const handleSignup = () => {
  error.value = ''
  
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
