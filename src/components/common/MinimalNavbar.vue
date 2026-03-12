<template>
  <header class="minimal-nav-wrapper">
    <nav class="minimal-nav">
      <div class="nav-content">
        <div class="nav-logo">VolunteerHub</div>
        <div class="nav-actions">
          <button @click="$emit('showLogin')" class="nav-link">Log in</button>
          <button @click="$emit('showSignup')" class="nav-link nav-link-signup">Sign up</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
defineEmits(['showLogin', 'showSignup'])
</script>

<style scoped>
.minimal-nav-wrapper {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.minimal-nav {
  max-width: 800px;
  width: 90%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  pointer-events: auto;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
}

.nav-logo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.3px;
}

.nav-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-link {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2c;
  background: transparent;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.05);
}

.nav-link-signup {
  background: rgba(0, 0, 0, 0.85);
  color: white;
}

.nav-link-signup:hover {
  background: rgba(0, 0, 0, 0.95);
}

@media (max-width: 768px) {
  .minimal-nav {
    width: 95%;
  }
  
  .nav-content {
    padding: 10px 16px;
  }
  
  .nav-logo {
    font-size: 16px;
  }
  
  .nav-link {
    font-size: 13px;
    padding: 6px 12px;
  }
}
</style>
