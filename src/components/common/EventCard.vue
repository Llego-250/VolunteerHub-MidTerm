<template>
  <div class="event-card" :style="{ animationDelay: animationDelay }">
    <!-- Header Section -->
    <div class="card-header">
      <div class="event-visual" :style="{ background: iconGradient }">
        <component :is="iconComponent" :size="48" :stroke-width="1.5" class="event-icon" v-if="iconComponent" />
        <span v-else class="event-emoji">📅</span>
      </div>
      <span v-if="price && !isFree" class="event-price">{{ price }}</span>
    </div>

    <!-- Middle Section -->
    <div class="card-body">
      <span class="category-tag" :style="{ background: categoryColor }">{{ category }}</span>
      <h4 class="event-title">{{ title }}</h4>
      <p class="event-description">{{ truncatedDescription }}</p>
      
      <div class="event-metadata">
        <span class="meta-item">
          <Calendar :size="16" :stroke-width="2" />
          {{ formattedDate }}
        </span>
        <span class="meta-item">
          <MapPin :size="16" :stroke-width="2" />
          {{ location }}
        </span>
        <span class="meta-item" v-if="showAttendees">
          <Users :size="16" :stroke-width="2" />
          {{ attendeeCount }}/{{ maxAttendees }}
        </span>
      </div>
    </div>

    <!-- Footer Section of our project -->
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
  Calendar, 
  MapPin, 
  Users,
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
  icon: { type: String, default: 'Calendar' },
  price: { type: String, default: '' },
  category: { type: String, required: true },
  categoryColor: { type: String, default: '#e0f2fe' },
  iconGradient: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: String, required: true },
  location: { type: String, required: true },
  attendeeCount: { type: Number, default: 0 },
  maxAttendees: { type: Number, default: 0 },
  showAttendees: { type: Boolean, default: true },
  buttonText: { type: String, default: 'Join Event' },
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
  'Calendar': Calendar
}

const iconComponent = computed(() => {
  try {
    return iconMap[props.icon] || Calendar
  } catch (error) {
    console.error('Icon error:', error)
    return null
  }
})

const isFree = computed(() => !props.price || props.price.toUpperCase() === 'FREE')

const truncatedDescription = computed(() => {
  if (!props.description) return ''
  return props.description.length > 80 
    ? props.description.substring(0, 80) + '...' 
    : props.description
})

const formattedDate = computed(() => {
  const date = new Date(props.date)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

const handleAction = () => {
  emit('action')
}
</script>

<style scoped>
/* 1. CARD CONTAINER */
.event-card {
  /* Dimensions */
  width: 100%;
  min-height: 380px;
  
  /* Border & Shadow */
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  
  /* Background color*/
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

.event-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #34d399);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
}

.event-card:hover::before {
  opacity: 1;
}

/* Dark Theme Event Card */
.dark-theme .event-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
}

.dark-theme .event-card:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.06) 100%);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
  transform: translateY(-8px) scale(1.02);
}

.dark-theme .event-card::before {
  background: linear-gradient(90deg, #10b981, #34d399, #10b981);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

/* 2. HEADER SECTION of our project */
.card-header {
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.event-visual {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;
}

.dark-theme .event-visual {
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
}

.event-card:hover .event-visual {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.dark-theme .event-card:hover .event-visual {
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.6);
}

.event-icon {
  color: white;
}

.event-emoji {
  font-size: 48px;
  line-height: 1;
}

.event-price {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  transition: all 0.3s ease;
}

.dark-theme .event-price {
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.5);
}

.event-price.free {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.dark-theme .event-price.free {
  box-shadow: 0 2px 12px rgba(99, 102, 241, 0.5);
}

/* 3. MIDDLE SECTION */
.card-body {
  padding: 20px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-tag {
  display: inline-block;
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  color: #0284c7;
  background: #e0f2fe;
  transition: all 0.3s ease;
  border: 1px solid rgba(2, 132, 199, 0.2);
}

.dark-theme .category-tag {
  background: rgba(2, 132, 199, 0.15);
  color: #38bdf8;
  border-color: rgba(2, 132, 199, 0.3);
}

.event-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.3px;
  transition: color 0.3s ease;
}

.dark-theme .event-title {
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.2);
}

.event-description {
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
  transition: color 0.3s ease;
}

.dark-theme .event-description {
  color: #d1d5db;
}

.event-metadata {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
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

.event-card:hover .meta-item :deep(svg) {
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
  .event-card {
    min-height: 400px;
  }
}

/* Tablet: Adjust spacing */
@media (max-width: 768px) {
  .card-header,
  .card-body,
  .card-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .event-visual {
    width: 52px;
    height: 52px;
  }
  
  .event-icon {
    width: 42px;
    height: 42px;
  }
}

/* Mobile: Stack and simplify */
@media (max-width: 480px) {
  .event-card {
    min-height: 360px;
  }
  
  .event-title {
    font-size: 18px;
  }
  
  .event-description {
    font-size: 13px;
  }
  
  .meta-item {
    font-size: 13px;
  }
}
</style>
