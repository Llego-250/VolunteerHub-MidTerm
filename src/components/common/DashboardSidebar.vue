<template>
  <aside class="sidebar">
    <nav>
      <button 
        v-for="item in items" 
        :key="item.id"
        @click="$emit('navigate', item.id)" 
        :class="{ active: activeTab === item.id }"
      >
        <i :class="item.icon"></i>
        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  items: Array,
  activeTab: String
})
defineEmits(['navigate'])
</script>

<style scoped>
.sidebar { 
  width: 70px; 
  background: linear-gradient(180deg, #d4f4dd 0%, #a8e6cf 50%, #56c596 100%); 
  height: calc(70vh - 50px); 
  position: fixed; 
  left: 0; 
  top: 150px; 
  border-radius: 30px;
  padding: 20px 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebar nav { 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  width: 100%;
  align-items: center;
}
.sidebar button { 
  width: 50px;
  height: 50px;
  top:20px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  background: rgba(255, 255, 255, 0.3); 
  border: none; 
  border-radius: 12px;
  cursor: pointer; 
  position: relative;
  transition: all 0.3s;
}
.sidebar button:hover { 
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}
.sidebar button.active { 
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.sidebar button i { 
  font-size: 22px; 
  color: #1f2937;
}
.sidebar button .badge { 
  position: absolute; 
  top: -5px;
  right: -5px; 
  background: #ef4444; 
  color: white; 
  border-radius: 50%; 
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}
</style>
