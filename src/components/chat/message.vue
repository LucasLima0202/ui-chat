  <template>
    <div :class="['message', sender === 'user' ? 'user' : 'bot']">
      <p>{{ text }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    text: String,
    sender: String
  })
  </script>
  
  <style scoped>
    @import "../style/message.css"
  </style>
  