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
            :aria-invalid="!!validationErrors.name"
            :aria-describedby="validationErrors.name ? 'name-error' : undefined"
            @blur="markTouched('name')"
            @input="validateName"
            :class="{ 'input-error': validationErrors.name, 'input-success': touched.name && !validationErrors.name && form.name }"
          />
          <span v-if="validationErrors.name" id="name-error" class="validation-error">
            <i class="fas fa-exclamation-circle"></i> {{ validationErrors.name }}
          </span>
          <span v-else-if="touched.name && form.name" class="validation-success">
            <i class="fas fa-check-circle"></i> Valid name
          </span>
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
            :aria-invalid="!!validationErrors.email"
            :aria-describedby="validationErrors.email ? 'email-error' : undefined"
            @blur="markTouched('email')"
            @input="validateEmail"
            :class="{ 'input-error': validationErrors.email, 'input-success': touched.email && !validationErrors.email && form.email }"
          />
          <span v-if="validationErrors.email" id="email-error" class="validation-error">
            <i class="fas fa-exclamation-circle"></i> {{ validationErrors.email }}
          </span>
          <span v-else-if="touched.email && form.email" class="validation-success">
            <i class="fas fa-check-circle"></i> Valid email
          </span>
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
            :aria-invalid="!!validationErrors.password"
            :aria-describedby="validationErrors.password ? 'password-error' : undefined"
            @blur="markTouched('password')"
            @input="validatePassword"
            :class="{ 'input-error': validationErrors.password, 'input-success': touched.password && !validationErrors.password && form.password }"
          />
          <span v-if="validationErrors.password" id="password-error" class="validation-error">
            <i class="fas fa-exclamation-circle"></i> {{ validationErrors.password }}
          </span>
          <span v-else-if="touched.password && form.password" class="validation-success">
            <i class="fas fa-check-circle"></i> Strong password
          </span>
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
          <label for="signup-phone">Phone Number (optional)</label>
          <input 
            id="signup-phone"
            v-model="form.phone" 
            type="tel" 
            tabindex="0"
            autocomplete="tel"
            placeholder="(123) 456-7890"
            :aria-invalid="!!validationErrors.phone"
            :aria-describedby="validationErrors.phone ? 'phone-error' : undefined"
            @blur="markTouched('phone')"
            @input="validatePhone"
            :class="{ 'input-error': validationErrors.phone, 'input-success': touched.phone && !validationErrors.phone && form.phone }"
          />
          <span v-if="validationErrors.phone" id="phone-error" class="validation-error">
            <i class="fas fa-exclamation-circle"></i> {{ validationErrors.phone }}
          </span>
          <span v-else-if="touched.phone && form.phone && !validationErrors.phone" class="validation-success">
            <i class="fas fa-check-circle"></i> Valid phone number
          </span>
        </div>
        <div class="form-group">
          <label for="signup-location">Location (optional)</label>
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
          :disabled="!isFormValid"
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { X } from 'lucide-vue-next'

const props = defineProps(['defaultRole'])
const emit = defineEmits(['close', 'switchToLogin', 'signupSuccess'])
const authStore = useAuthStore()
const router = useRouter()
const form = ref({ name: '', email: '', password: '', phone: '', location: '', role: 'volunteer' })
const error = ref('')
const nameInput = ref(null)
const touched = ref({ name: false, email: false, password: false, phone: false })

// Validation rules
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[\d\s\-\+\(\)]+$/
const validationErrors = ref({ name: '', email: '', password: '', phone: '' })

// Real-time validation
const validateName = () => {
  if (!touched.value.name) return
  
  if (!form.value.name) {
    validationErrors.value.name = 'Name is required'
  } else if (form.value.name.length < 2) {
    validationErrors.value.name = 'Name must be at least 2 characters'
  } else if (form.value.name.length > 50) {
    validationErrors.value.name = 'Name must be less than 50 characters'
  } else {
    validationErrors.value.name = ''
  }
}

const validateEmail = () => {
  if (!touched.value.email) return
  
  if (!form.value.email) {
    validationErrors.value.email = 'Email is required'
  } else if (!emailRegex.test(form.value.email)) {
    validationErrors.value.email = 'Please enter a valid email address'
  } else {
    validationErrors.value.email = ''
  }
}

const validatePassword = () => {
  if (!touched.value.password) return
  
  if (!form.value.password) {
    validationErrors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    validationErrors.value.password = 'Password must be at least 6 characters'
  } else if (form.value.password.length > 50) {
    validationErrors.value.password = 'Password must be less than 50 characters'
  } else {
    validationErrors.value.password = ''
  }
}

const validatePhone = () => {
  if (!touched.value.phone) return
  
  if (form.value.phone && !phoneRegex.test(form.value.phone)) {
    validationErrors.value.phone = 'Please enter a valid phone number'
  } else if (form.value.phone && form.value.phone.replace(/\D/g, '').length < 10) {
    validationErrors.value.phone = 'Phone number must be at least 10 digits'
  } else {
    validationErrors.value.phone = ''
  }
}

// Mark field as touched
const markTouched = (field) => {
  touched.value[field] = true
  if (field === 'name') validateName()
  if (field === 'email') validateEmail()
  if (field === 'password') validatePassword()
  if (field === 'phone') validatePhone()
}

// Check if form is valid
const isFormValid = computed(() => {
  return form.value.name && 
         form.value.email && 
         form.value.password && 
         form.value.name.length >= 2 &&
         emailRegex.test(form.value.email) &&
         form.value.password.length >= 6 &&
         (!form.value.phone || (phoneRegex.test(form.value.phone) && form.value.phone.replace(/\D/g, '').length >= 10))
})

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
  // Mark all fields as touched
  touched.value.name = true
  touched.value.email = true
  touched.value.password = true
  if (form.value.phone) touched.value.phone = true
  
  // Validate all fields
  validateName()
  validateEmail()
  validatePassword()
  if (form.value.phone) validatePhone()
  
  // Check if there are validation errors
  if (validationErrors.value.name || validationErrors.value.email || 
      validationErrors.value.password || validationErrors.value.phone) {
    error.value = 'Please fix the errors above'
    return
  }
  
  error.value = ''
  
  if (authStore.signup(form.value)) {
    emit('signupSuccess')
    emit('close')
    router.push(form.value.role === 'volunteer' ? '/volunteer-dashboard' : '/organizer-dashboard')
  } else {
    error.value = 'Email already exists. Please use a different email or login.'
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

.form-group input:focus-visible,
.form-group select:focus-visible {
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


/* Validation Styles */
.input-error {
  border-color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.05);
}

.input-error:focus {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
}

.input-success {
  border-color: #10b981 !important;
  background: rgba(16, 185, 129, 0.05);
}

.input-success:focus {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important;
}

.validation-error {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  animation: slideDown 0.2s ease;
}

.validation-error i {
  font-size: 11px;
}

.validation-success {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #10b981;
  font-size: 12px;
  margin-top: 4px;
  animation: slideDown 0.2s ease;
}

.validation-success i {
  font-size: 11px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark theme validation */
.dark-theme .input-error {
  background: rgba(239, 68, 68, 0.1);
}

.dark-theme .input-success {
  background: rgba(16, 185, 129, 0.1);
}
