<template>
  <div class="message bot">
    <h5 v-if="title" class="list-title">{{ title }}</h5>
    <ul class="message-list">
      <li v-for="(item, idx) in items" :key="idx" class="list-item">
        <template v-if="isObject(item)">
          <div class="list-object">
            <div v-for="(value, key) in item" :key="key" class="list-object-row">
              <strong>{{ formatKey(key) }}:</strong> {{ value ?? '—' }}
            </div>
          </div>
        </template>
        <template v-else>
          <span class="bullet">•</span> {{ item }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

const isObject = (item) => {
  return typeof item === 'object' && item !== null && !Array.isArray(item)
}

const formatKey = (key) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
</script>

<style scoped>
.message {
  border-radius: 12px;
  font-size: 0.95rem;
  margin-bottom: 12px;
}
.list-title {
 font-size: 15px;
 font-weight: 400;
 color: #333333;
 
 margin-bottom: 3%;
}
ul {
   list-style-type: circle !important;
}
.message-list {
  padding-left: 0;
}
.list-item {
  margin-bottom: 12px;
  color: #555;
  line-height: 1.4;
}
.bullet {
  margin-right: 8px;

}
.list-object {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 14px;
  
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.list-object-row {
  
  margin-bottom: 4px;
}
.list-object-row:last-child {
  margin-bottom: 0;
}
</style>
