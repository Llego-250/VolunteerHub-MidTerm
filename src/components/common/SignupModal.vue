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
.modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; overflow-y: auto; }
.modal-content { background: white; padding: 30px; border-radius: 12px; width: 450px; max-width: 90%; margin: 20px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.modal-header h2 { font-size: 24px; margin: 0; color: var(--dark); }
.close-btn { background: none; border: none; color: var(--gray); cursor: pointer; padding: 0; }
.close-btn:hover { color: var(--dark); }
form { display: flex; flex-direction: column; gap: 15px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-weight: 500; color: var(--dark); font-size: 13px; }
.form-group input, .form-group select { padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; }
.btn-submit { width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 8px; }
.btn-submit:hover { background: var(--primary-dark); }
.error { color: #ef4444; margin: 0; font-size: 14px; }
.footer-text { text-align: center; color: var(--gray); margin: 10px 0 0; font-size: 14px; }
.footer-text a { color: var(--primary); cursor: pointer; text-decoration: none; }
.footer-text a:hover { text-decoration: underline; }
</style>
