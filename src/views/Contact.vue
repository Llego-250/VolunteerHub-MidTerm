<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <textarea v-model="form.message" placeholder="Message" required></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const handleSubmit = () => {
  alert('Message sent!')
  form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.contact { padding: 40px; max-width: 600px; margin: 0 auto; }
form { display: flex; flex-direction: column; gap: 15px; }
input, textarea { padding: 10px; }
textarea { min-height: 150px; }
</style>
