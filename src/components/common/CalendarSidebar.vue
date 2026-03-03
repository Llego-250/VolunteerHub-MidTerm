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
.calendar-sidebar { position: fixed; right: 0; top: 150px; width: 300px; height: calc(70vh - 50px); background: white; border: 1px solid var(--border); border-radius: 30px 0 0 30px; padding: 20px; transform: translateX(100%); transition: transform 0.3s; z-index: 99; overflow-y: auto; }
.calendar-sidebar.open { transform: translateX(0); }
.calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.calendar-header h3 { margin: 0; }
.close-btn { background: none; border: none; font-size: 24px; cursor: pointer; color: var(--gray); }
.calendar-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.calendar-controls button { background: none; border: none; cursor: pointer; padding: 5px 10px; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
.day-header { text-align: center; font-weight: bold; padding: 5px; font-size: 12px; color: var(--gray); }
.calendar-day { text-align: center; padding: 8px 4px; font-size: 14px; border-radius: 4px; }
.calendar-day.other-month { color: var(--gray); opacity: 0.5; }
.calendar-day.has-event { background: var(--primary); color: white; font-weight: bold; }
</style>
