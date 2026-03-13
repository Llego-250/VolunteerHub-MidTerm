<template>
  <div class="calendar-sidebar" :class="{ open: isOpen }">
    <div class="calendar-header">
      <h3>Calendar</h3>
      <button @click="$emit('close')" class="close-btn">&times;</button>
    </div>
    <div class="calendar-controls">
      <button @click="prevMonth">&lt;</button>
      <span>{{ currentMonthYear }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div class="day-header" v-for="day in ['S','M','T','W','T','F','S']" :key="day">{{ day }}</div>
      <div v-for="date in calendarDates" :key="date.key" class="calendar-day" :class="{ 'other-month': !date.current, 'has-event': date.hasEvent }">
        {{ date.day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  events: Array
})

defineEmits(['close'])

const currentDate = ref(new Date())

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()
  
  const eventDates = new Set((props.events || []).map(e => new Date(e.date).toDateString()))
  
  const dates = []
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({ day: prevMonthDays - i, current: false, key: `prev-${i}` })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = new Date(year, month, i).toDateString()
    dates.push({ day: i, current: true, hasEvent: eventDates.has(dateStr), key: `curr-${i}` })
  }
  const remaining = 42 - dates.length
  for (let i = 1; i <= remaining; i++) {
    dates.push({ day: i, current: false, key: `next-${i}` })
  }
  return dates
})
</script>

<style scoped>
.calendar-sidebar { 
  position: fixed; 
  right: 0; 
  top: 150px; 
  width: 300px; 
  height: calc(70vh - 50px); 
  background: white; 
  border: 1px solid var(--border); 
  border-radius: 30px 0 0 30px; 
  padding: 20px; 
  transform: translateX(100%); 
  transition: all 0.3s ease; 
  z-index: 99; 
  overflow-y: auto;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
}

/* Dark Theme Calendar Sidebar */
.dark-theme .calendar-sidebar {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: -4px 0 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.calendar-sidebar.open { 
  transform: translateX(0); 
}

.calendar-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 20px; 
}

.calendar-header h3 { 
  margin: 0;
  color: #1f2937;
  transition: color 0.3s ease;
}

.dark-theme .calendar-header h3 {
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
}

.close-btn { 
  background: none; 
  border: none; 
  font-size: 24px; 
  cursor: pointer; 
  color: var(--gray);
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.dark-theme .close-btn {
  color: #9ca3af;
}

.dark-theme .close-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.calendar-controls { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.dark-theme .calendar-controls {
  background: rgba(16, 185, 129, 0.1);
}

.calendar-controls span {
  font-weight: 600;
  color: #1f2937;
  transition: color 0.3s ease;
}

.dark-theme .calendar-controls span {
  color: #ffffff;
}

.calendar-controls button { 
  background: white; 
  border: 1px solid #e5e7eb; 
  cursor: pointer; 
  padding: 5px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #1f2937;
}

.calendar-controls button:hover {
  background: #10b981;
  color: white;
  border-color: #10b981;
  transform: scale(1.1);
}

.dark-theme .calendar-controls button {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.dark-theme .calendar-controls button:hover {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.calendar-grid { 
  display: grid; 
  grid-template-columns: repeat(7, 1fr); 
  gap: 5px; 
}

.day-header { 
  text-align: center; 
  font-weight: bold; 
  padding: 5px; 
  font-size: 12px; 
  color: var(--gray);
  transition: color 0.3s ease;
}

.dark-theme .day-header {
  color: #9ca3af;
}

.calendar-day { 
  text-align: center; 
  padding: 8px 4px; 
  font-size: 14px; 
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  color: #1f2937;
}

.calendar-day:hover {
  background: rgba(16, 185, 129, 0.1);
  transform: scale(1.1);
}

.dark-theme .calendar-day {
  color: #d1d5db;
}

.dark-theme .calendar-day:hover {
  background: rgba(16, 185, 129, 0.2);
}

.calendar-day.other-month { 
  color: var(--gray); 
  opacity: 0.5; 
}

.calendar-day.has-event { 
  background: linear-gradient(135deg, #10b981, #059669); 
  color: white; 
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.dark-theme .calendar-day.has-event {
  box-shadow: 0 2px 12px rgba(16, 185, 129, 0.5);
}

.calendar-day.has-event:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.dark-theme .calendar-day.has-event:hover {
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.6);
}

/* Custom Scrollbar */
.calendar-sidebar::-webkit-scrollbar {
  width: 6px;
}

.calendar-sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.calendar-sidebar::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 10px;
}

.calendar-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}

.dark-theme .calendar-sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}

.dark-theme .calendar-sidebar::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.4);
}

.dark-theme .calendar-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.6);
}
</style>
