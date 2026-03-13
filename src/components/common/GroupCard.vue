<template>
  <div class="group-card" :style="{ animationDelay: animationDelay }">
    <!-- Header Section -->
    <div class="card-header">
      <div class="group-icon" :style="{ background: iconColor }">
        <component :is="iconComponent" :size="40" :stroke-width="2" class="icon" v-if="iconComponent" />
        <span v-else>{{ emoji }}</span>
      </div>
    </div>

    <!-- Middle Section -->
    <div class="card-body">
      <h4 class="group-title">{{ title }}</h4>
      <p class="group-description">{{ truncatedDescription }}</p>
      
      <div class="group-metadata">
        <span class="meta-item">
          <Users :size="14" :stroke-width="2" />
          {{ memberCount }} members
        </span>
        <span class="meta-item" v-if="eventCount">
          <Calendar :size="14" :stroke-width="2" />
          {{ eventCount }} events
        </span>
        <span class="meta-item" v-if="category">
          <Tag :size="14" :stroke-width="2" />
          {{ category }}
        </span>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="card-footer">
      <button 
        @click="handleAction" 
        :disabled="isDisabled"
        :class="['btn-action', buttonVariant]"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  Users, 
  Calendar, 
  Tag,
  Leaf,
  BookOpen,
  Heart,
  Home,
  Dog,
  AlertCircle,
  UserCheck,
  Baby
} from 'lucide-vue-next'

const props = defineProps({
  icon: { type: String, default: '' },
  emoji: { type: String, default: '👥' },
  iconColor: { type: String, default: '#10b981' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  memberCount: { type: Number, required: true },
  eventCount: { type: Number, default: 0 },
  category: { type: String, default: '' },
  buttonText: { type: String, default: 'Join Group' },
  buttonVariant: { type: String, default: 'primary' },
  isDisabled: { type: Boolean, default: false },
  animationDelay: { type: String, default: '0s' }
})

const emit = defineEmits(['action'])

const iconMap = {
  'Leaf': Leaf,
  'BookOpen': BookOpen,
  'Heart': Heart,
  'Home': Home,
  'Dog': Dog,
  'AlertCircle': AlertCircle,
  'UserCheck': UserCheck,
  'Baby': Baby,
  'Users': Users
}

const iconComponent = computed(() => {
  try {
    return props.icon ? iconMap[props.icon] || Users : null
  } catch (error) {
    console.error('Icon error:', error)
    return null
  }
})

const truncatedDescription = computed(() => {
  if (!props.description) return ''
  return props.description.length > 100 
    ? props.description.substring(0, 100) + '...' 
    : props.description
})

const handleAction = () => {
  emit('action')
}
</script>

<style scoped>
/* 1. CARD CONTAINER */
.group-card {
  /* Dimensions */
  width: 100%;
  min-height: 320px;
  
  /* Border & Shadow */
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  
  /* Background */
  background: white;
  
  /* Layout */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  /* Animation */
  animation: fadeInUp 0.6s ease-out backwards;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.group-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #10b981, #34d399);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.group-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
}

.group-card:hover::before {
  opacity: 1;
}

/* Dark Theme Group Card */
.dark-theme .group-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
}

.dark-theme .group-card:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.06) 100%);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
  transform: translateY(-8px) scale(1.02);
}

.dark-theme .group-card::before {
  background: linear-gradient(90deg, #10b981, #34d399, #10b981);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

/* 2. HEADER SECTION */
.card-header {
  padding: 32px 24px 20px;
  display: flex;
  justify-content: center;
}

.group-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: white;
}

.dark-theme .group-icon {
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
}

.group-icon .icon {
  color: white;
}

.group-card:hover .group-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.dark-theme .group-card:hover .group-icon {
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.6);
}

/* 3. MIDDLE SECTION */
.card-body {
  padding: 0 24px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.group-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.3px;
  transition: color 0.3s ease;
}

.dark-theme .group-title {
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.2);
}

.group-description {
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
  transition: color 0.3s ease;
}

.dark-theme .group-description {
  color: #d1d5db;
}

.group-metadata {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding-top: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
  transition: color 0.3s ease;
}

.dark-theme .meta-item {
  color: #9ca3af;
}

.meta-item :deep(svg) {
  color: #10b981;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.dark-theme .meta-item :deep(svg) {
  color: #34d399;
}

.group-card:hover .meta-item :deep(svg) {
  transform: scale(1.1);
}

/* 4. FOOTER SECTION */
.card-footer {
  padding: 0 24px 24px;
}

.btn-action {
  width: 100%;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.2px;
  position: relative;
  overflow: hidden;
}

.btn-action::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-action:hover::before {
  width: 300px;
  height: 300px;
}

.btn-action.primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-action.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.dark-theme .btn-action.primary {
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.5);
}

.dark-theme .btn-action.primary:hover:not(:disabled) {
  box-shadow: 0 6px 24px rgba(16, 185, 129, 0.6);
}

.btn-action.secondary {
  background: #f3f4f6;
  color: #1f2937;
  border: 2px solid #e5e7eb;
}

.btn-action.secondary:hover:not(:disabled) {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.dark-theme .btn-action.secondary {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 2px solid rgba(16, 185, 129, 0.3);
}

.dark-theme .btn-action.secondary:hover:not(:disabled) {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.5);
}

.btn-action:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.dark-theme .btn-action:disabled {
  background: rgba(156, 163, 175, 0.3);
  color: #6b7280;
}

/* 5. ANIMATIONS */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 6. RESPONSIVE BEHAVIOR */
/* Desktop: 300px+ width */
@media (min-width: 1024px) {
  .group-card {
    min-height: 340px;
  }
}

/* Tablet: Adjust spacing */
@media (max-width: 768px) {
  .card-header {
    padding: 28px 20px 16px;
  }
  
  .card-body,
  .card-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .group-icon {
    width: 70px;
    height: 70px;
    font-size: 36px;
  }
}

/* Mobile: Stack and simplify */
@media (max-width: 480px) {
  .group-card {
    min-height: 300px;
  }
  
  .group-title {
    font-size: 18px;
  }
  
  .group-description {
    font-size: 13px;
  }
  
  .meta-item {
    font-size: 12px;
  }
  
  .group-icon {
    width: 64px;
    height: 64px;
    font-size: 32px;
  }
}
</style>
