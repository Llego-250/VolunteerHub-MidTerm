<template>
  <div class="contact">
    <header class="nav-header">
      <div class="logo">
        <span class="logo-icon">🤝</span>
        <h1>VolunteerHub</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/events">Events</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>
    <div class="contact-container">
      <div class="contact-form">
        <h2>Send us a Message</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Subject</label>
            <select v-model="form.subject" required>
              <option value="">Select a topic</option>
              <option>General Inquiry</option>
              <option>Partnership</option>
              <option>Support</option>
            </select>
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea v-model="form.message" placeholder="Tell us how we can help you..." required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div class="contact-info">
        <h2>Get in Touch</h2>
        <div class="info-item">
          <span class="icon">📧</span>
          <div>
            <h4>Email</h4>
            <p>support@volunteerhub.com</p>
            <p>partnerships@volunteerhub.com</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">📞</span>
          <div>
            <h4>Phone</h4>
            <p>(+250) 796 606 714</p>
            <p>Mon-Fri, 9AM-6PM EST</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">📍</span>
          <div>
            <h4>Address</h4>
            <p>Rwanda Kigali City</p>
            <p>Kanombe, Kk 89 st</p>
          </div>
        </div>
        <div class="social">
          <h4>Follow Us</h4>
          <div class="social-icons">
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📷</a>
            <a href="#">💼</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', subject: '', message: '' })
const handleSubmit = () => {
  alert('Message sent!')
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<style scoped>
.contact { background: var(--light-gray); min-height: 100vh; }
.nav-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 60px; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
.logo { display: flex; align-items: center; gap: 10px; }
.logo-icon { font-size: 32px; }
.logo h1 { font-size: 24px; color: var(--primary); margin: 0; }
.nav-links { display: flex; gap: 30px; }
.nav-links a { color: var(--dark); font-weight: 500; }
.contact-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1200px; margin: 60px auto; padding: 0 60px; }
.contact-form, .contact-info { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.contact-form h2, .contact-info h2 { margin-bottom: 30px; font-size: 28px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
textarea { min-height: 120px; resize: vertical; }
button { width: 100%; margin-top: 10px; }
.info-item { display: flex; gap: 20px; margin-bottom: 30px; }
.info-item .icon { font-size: 40px; color: var(--primary); }
.info-item h4 { margin: 0 0 10px; font-size: 18px; }
.info-item p { margin: 5px 0; color: var(--gray); }
.social { margin-top: 40px; }
.social h4 { margin-bottom: 15px; }
.social-icons { display: flex; gap: 15px; }
.social-icons a { font-size: 32px; }
</style>
