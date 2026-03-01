<template>
  <div class="contact">
    <Navbar />
    
    <div class="page-header">
      <h1>Contact Us</h1>
      <p>Get in touch with our team - we're here to help you make a difference</p>
    </div>

    <div class="contact-container">
      <div class="contact-form">
        <h2>Send us a Message</h2>
        <form @submit.prevent="handleContactForm">
          <div class="form-group">
            <label>Full Name *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Email Address *</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Subject *</label>
            <select v-model="form.subject" required>
              <option value="">Select a topic</option>
              <option>General Inquiry</option>
              <option>Volunteer Support</option>
              <option>Organizer Support</option>
              <option>Technical Issue</option>
              <option>Partnership Opportunity</option>
              <option>Feedback</option>
            </select>
          </div>
          <div class="form-group">
            <label>Message *</label>
            <textarea v-model="form.message" placeholder="Tell us how we can help you..." required></textarea>
          </div>
          <button type="submit" class="btn-submit">Send Message</button>
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
            <p>Hours: Mon-Fri, 9AM-6PM EST</p>
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
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
    </div>

    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3>How do I sign up as a volunteer?</h3>
          <p>Click the "Start Volunteering" button on the homepage, fill out the registration form with your details, and you'll be ready to browse and register for events immediately.</p>
        </div>
        <div class="faq-item">
          <h3>How can I create an event?</h3>
          <p>Sign up for an organizer account, navigate to your dashboard, and click "Create Event". Fill in the event details including title, description, date, location, and volunteer requirements.</p>
        </div>
        <div class="faq-item">
          <h3>Is there a cost to use VolunteerHub?</h3>
          <p>No, VolunteerHub is completely free for both volunteers and organizers. Our mission is to make volunteering accessible to everyone.</p>
        </div>
        <div class="faq-item">
          <h3>How do I cancel my event registration?</h3>
          <p>Go to your volunteer dashboard, find the event under "My Registered Events", and click the "Unregister" button. You'll receive a confirmation of your cancellation.</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-col">
          <h3>VolunteerHub</h3>
          <p>Connecting volunteers with meaningful opportunities worldwide.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <router-link to="/">Home</router-link>
          <router-link to="/events">Browse Events</router-link>
          <router-link to="/about">About Us</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 VolunteerHub. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/common/Navbar.vue'

const form = ref({ name: '', email: '', subject: '', message: '' })

const handleContactForm = () => {
  alert('Thank you for contacting us! We will get back to you soon.')
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<style scoped>
.contact { background: var(--light-gray); min-height: 100vh; }
.page-header { background: linear-gradient(135deg, var(--primary) 0%, #059669 100%); color: white; text-align: center; padding: 100px 60px 60px; margin-top: 80px; }
.page-header h1 { font-size: 48px; margin-bottom: 15px; }
.page-header p { font-size: 20px; opacity: 0.95; }
.contact-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1200px; margin: 60px auto; padding: 0 60px; }
.contact-form, .contact-info { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.contact-form h2, .contact-info h2 { margin-bottom: 30px; font-size: 28px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; }
textarea { min-height: 120px; resize: vertical; font-family: inherit; }
.btn-submit { width: 100%; margin-top: 10px; padding: 14px; background: var(--primary); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
.btn-submit:hover { background: #059669; }
.info-item { display: flex; gap: 20px; margin-bottom: 30px; }
.info-item .icon { font-size: 40px; color: var(--primary); }
.info-item h4 { margin: 0 0 10px; font-size: 18px; }
.info-item p { margin: 5px 0; color: var(--gray); }
.social { margin-top: 40px; }
.social h4 { margin-bottom: 15px; }
.social-icons { display: flex; gap: 15px; }
.social-icons a { font-size: 32px; text-decoration: none; transition: transform 0.2s; }
.social-icons a:hover { transform: scale(1.1); }
.faq-section { max-width: 1200px; margin: 60px auto; padding: 60px; background: white; border-radius: 12px; }
.faq-section h2 { text-align: center; font-size: 36px; margin-bottom: 40px; }
.faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.faq-item { padding: 25px; background: var(--light-gray); border-radius: 8px; }
.faq-item h3 { font-size: 18px; margin-bottom: 12px; color: var(--primary); }
.faq-item p { color: var(--gray); line-height: 1.6; margin: 0; }
.footer { background: #1f2937; color: white; padding: 60px 60px 20px; }
.footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; margin-bottom: 40px; max-width: 1200px; margin: 0 auto 40px; }
.footer-col h3, .footer-col h4 { margin-bottom: 20px; color: var(--primary); }
.footer-col p { color: #9ca3af; line-height: 1.6; }
.footer-col a { display: block; color: #9ca3af; margin-bottom: 10px; text-decoration: none; }
.footer-col a:hover { color: white; }
.footer-bottom { text-align: center; padding-top: 20px; border-top: 1px solid #374151; color: #9ca3af; }

@media (max-width: 768px) {
  .contact-container { grid-template-columns: 1fr; }
  .faq-grid { grid-template-columns: 1fr; }
  .footer-content { grid-template-columns: 1fr; gap: 30px; }
}
</style>
