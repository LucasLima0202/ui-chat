<template>
    <div class="message-list">
      <p v-if="title" class="list-title">{{ title }}</p>
  
      <ul class="list-items">
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  })
  </script>
  
  <style scoped>
  .message-list {
    padding: 16px 20px;
    padding-left: 0;
    max-width: 80%;
    border-radius: 10px;
    font-size: 15px;
    line-height: 1.6;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  
  .list-title {
    margin-bottom: 12px;
  }
  
  .list-items {
    list-style-type: circle;
    padding-left: 20px;
  }
  
  .list-items li {
    margin-bottom: 6px;
  }
  </style>
  