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
    @import "../../style/message.css"
</style>
