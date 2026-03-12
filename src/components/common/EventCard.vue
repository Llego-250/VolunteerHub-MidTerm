<template>
  <div class="event-card" :style="{ animationDelay: animationDelay }">
    <!-- Header Section -->
    <div class="card-header">
      <div class="event-visual">
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
  Calendar, 
  MapPin, 
  Users,
  Leaf,
  BookOpen,
  Heart,
  Home,
  Paw,
  AlertCircle,
  UserCheck,
  Baby
} from 'lucide-vue-next'

const props = defineProps({
  icon: { type: String, default: 'Calendar' },
  price: { type: String, default: '' },
  category: { type: String, required: true },
  categoryColor: { type: String, default: '#e0f2fe' },
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
  'Paw': Paw,
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

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
}

/* 2. HEADER SECTION */
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
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.event-icon {
  color: white;
}

.event-emoji {
  font-size: 48px;
  line-height: 1;
}

.event-price {
  background: #10b981;
  color: white;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.event-price.free {
  background: #6366f1;
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
}

.event-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.event-description {
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
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
