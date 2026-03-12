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
  
  /* Background */
  background: white;
  
  /* Layout */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  /* Animation */
  animation: fadeInUp 0.6s ease-out backwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.group-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
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
  transition: transform 0.3s ease;
  color: white;
}

.group-icon .icon {
  color: white;
}

.group-card:hover .group-icon {
  transform: scale(1.1) rotate(5deg);
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
}

.group-description {
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
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
}

.meta-item :deep(svg) {
  color: #10b981;
  flex-shrink: 0;
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
  transition: all 0.2s ease;
  letter-spacing: 0.2px;
}

.btn-action.primary {
  background: #10b981;
  color: white;
}

.btn-action.primary:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
}

.btn-action.secondary {
  background: #f3f4f6;
  color: #1f2937;
}

.btn-action.secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-action:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
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
