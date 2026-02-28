<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <input v-model="form.name" placeholder="Name" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Password" required />
        <input v-model="form.phone" placeholder="Phone" />
        <input v-model="form.location" placeholder="Location" />
        <select v-model="form.role" required>
          <option value="">Select Role</option>
          <option value="volunteer">Volunteer</option>
          <option value="organizer">Organizer</option>
        </select>
        <button type="submit">Sign Up</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps(['defaultRole'])
const emit = defineEmits(['close'])
const authStore = useAuthStore()
const router = useRouter()
const form = ref({ name: '', email: '', password: '', phone: '', location: '', role: '' })
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
</script>

<style scoped>
.modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; padding: 30px; border-radius: 8px; width: 400px; }
form { display: flex; flex-direction: column; gap: 15px; }
input, select { padding: 10px; }
.error { color: red; }
</style>
